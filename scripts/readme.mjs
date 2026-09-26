// Parses README.md and README_zh.md into one data model, and reports every place a README
// breaks the house rules in CONTRIBUTING.md. The READMEs are the product: the website renders
// only what this returns, and CI runs the same checks on every pull request.
//
// No dependencies, so the check runs on a bare Node in CI.

import { readFileSync } from 'node:fs';

export const LEVELS = { '🟢': 'beginner', '🟡': 'intermediate', '🔴': 'advanced' };
// Blogs, podcasts, communities, and conferences carry no level tag.
export const UNTAGGED_SECTIONS = new Set([17, 18, 19, 20]);

const COMMERCIAL = { en: /note the commercial author/i, zh: /注意作者为商业方/ };
const END = { en: /[.!?]\)?$/, zh: /[。！？]）?$/ };
const SECTION_RE = /^## (\S+) (\d+)\. (.+)$/;
const SUMMARY_RE = /^<summary><b>(?:📖 )?.*?(\d+)(?:\s*项资源|\s*resources?|[^<]*)<\/b><\/summary>$/;
// - 🟢 [Title](url): Description.   (zh uses the full-width colon)
const RESOURCE_RE =
  /^- (?:([🟢🟡🔴])(?:→([🟢🟡🔴]))? )?\[(.+?)\]\((https?:\/\/[^\s)]+(?:\([^\s)]*\))?[^\s)]*)\)(: |：)(.+)$/u;
const PICK_RE = /^\| \*\*(.+?)\*\* \| (.+?) \| (.+?) \|$/;

/** Section slugs come from the English titles, so both languages share URLs. */
export function slugify(title) {
  return title
    .replace(/\(.*?\)/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Parse one README. Returns { data, errors }. Errors carry the file and line so a
 * contributor can go straight to the problem.
 */
export function parseReadme(text, { lang, file }) {
  const lines = text.split('\n');
  const errors = [];
  const err = (line, message) => errors.push({ file, line, message });

  lines.forEach((l, i) => {
    if (l.includes('—')) err(i + 1, 'Em dash found. Use a colon, period, or parentheses instead.');
  });

  // Split into blocks at each top-level heading.
  const blocks = [];
  let current = { heading: null, start: 1, lines: [] };
  lines.forEach((l, i) => {
    if (l.startsWith('## ')) {
      blocks.push(current);
      current = { heading: l, start: i + 1, lines: [] };
    } else current.lines.push({ n: i + 1, text: l });
  });
  blocks.push(current);

  const [header, ...rest] = blocks;
  const data = { lang, hero: parseHeader(header), sections: [] };

  const sectionBlocks = rest.filter((b) => SECTION_RE.test(b.heading));
  const firstSection = rest.indexOf(sectionBlocks[0]);
  const before = rest.slice(0, firstSection);
  const after = rest.slice(firstSection + sectionBlocks.length);

  // Before the sections: how to use, the handbook, the table of contents.
  const [howTo, handbook, toc] = before;
  data.howTo = { title: stripHeading(howTo?.heading), steps: orderedList(howTo) };
  data.handbook = parseHandbook(handbook);
  const tocCount = toc?.lines.map((l) => l.text.match(/(\d+)/)).find(Boolean);
  const tocEntries = (toc?.lines ?? [])
    .map((l) => ({ n: l.n, m: l.text.match(/^(\d+)\. \[.+?\]\((#[^)]+)\)$/) }))
    .filter((e) => e.m);
  const tocItems = tocEntries.length;
  data.toc = { title: stripHeading(toc?.heading) };

  for (const b of sectionBlocks) data.sections.push(parseSection(b, lang, err));

  if (!sectionBlocks.length) err(1, 'No numbered sections ("## 🧭 1. Title") found.');
  if (!tocItems) err(toc?.start ?? 1, 'No table of contents entries found.');
  if (tocItems !== data.sections.length)
    err(toc?.start ?? 1, `Table of contents lists ${tocItems} sections; the README has ${data.sections.length}.`);
  // Each entry must name its section's number and link to that heading's GitHub anchor.
  tocEntries.forEach(({ n, m }, i) => {
    const block = sectionBlocks[i];
    if (!block) return;
    const anchor = `#${githubSlug(stripHeading(block.heading))}`;
    if (Number(m[1]) !== i + 1) err(n, `Table of contents entry ${i + 1} is numbered ${m[1]}.`);
    if (m[2] !== anchor) err(n, `Table of contents entry ${i + 1} links to ${m[2]}; the heading's anchor is ${anchor}.`);
  });
  if (tocCount && Number(tocCount[1]) !== data.sections.length)
    err(toc.start, `Table of contents says ${tocCount[1]} sections; the README has ${data.sections.length}.`);
  data.sections.forEach((s, i) => {
    if (s.num !== i + 1) err(s.line, `Section numbers must run 1, 2, 3...; found ${s.num} in position ${i + 1}.`);
  });

  // After the sections: learning path, contributing, stargazers, license.
  const [path, contributing] = after;
  data.learningPath = {
    title: stripHeading(path?.heading),
    steps: (path?.lines ?? [])
      .map((l) => l.text.match(/^\d+\. \*\*(.+?)[:：]\*\* (.+)$/))
      .filter(Boolean)
      .map((m) => ({
        label: m[1],
        text: m[2],
        sections: [...m[2].matchAll(/(?:sections|第) ?([\d、, ]+)(?: ?节)?\)?/g)]
          .flatMap((x) => x[1].split(/[、,]\s*/))
          .map((x) => Number(x.trim()))
          .filter(Boolean),
      })),
  };
  data.contributing = {
    title: stripHeading(contributing?.heading),
    text: paragraphs(contributing).join('\n\n'),
  };
  data.count = data.sections.reduce((n, s) => n + s.count, 0);
  return { data, errors };
}

function parseHeader(block) {
  const text = block.lines.map((l) => l.text);
  const tagline = text.find((l) => /^\*\*.+\*\*$/.test(l.trim()))?.replace(/^\*\*|\*\*$/g, '') ?? '';
  const afterDiv = text.slice(text.indexOf('</div>') + 1);
  const paras = splitParagraphs(afterDiv).filter((p) => p !== '---');
  const bannerAlt = text.join('\n').match(/<img [^>]*alt="([^"]+)"/)?.[1] ?? '';
  // The banner's alt text is the list's name and headline: "Voice AI: a curated learning path...".
  const [title, ...headline] = bannerAlt.split(/[:：]\s*/);
  return { tagline, lede: paras[0] ?? '', levels: paras[1] ?? '', title, headline: headline.join(': ') };
}

function parseHandbook(block) {
  if (!block) return null;
  const paras = paragraphs(block);
  const disclosure = paras.find((p) => p.startsWith('>'))?.replace(/^>\s*_?|_$/g, '') ?? '';
  const url = block.lines.map((l) => l.text).join('\n').match(/\((https:\/\/handbook\.[^)]+)\)/)?.[1] ?? '';
  return {
    title: stripHeading(block.heading).replace(/^📘\s*/, ''),
    body: paras.filter((p) => !p.startsWith('>')),
    disclosure,
    url,
  };
}

function parseSection(block, lang, err) {
  const [, emoji, num, title] = block.heading.match(SECTION_RE);
  const section = {
    num: Number(num),
    emoji,
    title,
    line: block.start,
    intro: '',
    picks: [],
    picksHeader: null,
    countLabel: '',
    count: 0,
    declared: null,
    groups: [],
  };
  let group = { title: null, resources: [] };
  const introLines = [];
  let inDetails = false;

  for (const { n, text } of block.lines) {
    const t = text.trim();
    if (!t || t === '---') continue;
    if (t === '<details>') {
      inDetails = true;
      continue;
    }
    if (t === '</details>') {
      inDetails = false;
      continue;
    }
    const summary = t.match(SUMMARY_RE);
    if (summary) {
      section.declared = { value: Number(summary[1]), line: n };
      section.countLabel = t.replace(/<\/?(summary|b)>/g, '');
      continue;
    }
    if (!inDetails) {
      const pick = t.match(PICK_RE);
      if (pick) section.picks.push({ name: pick[1], type: pick[2], bestFor: pick[3] });
      else if (/^\|[^-]/.test(t) && !section.picksHeader)
        section.picksHeader = t.split('|').map((c) => c.trim()).filter(Boolean);
      else if (!t.startsWith('|')) introLines.push(t);
      continue;
    }
    if (t.startsWith('### ')) {
      if (group.resources.length || group.title) section.groups.push(group);
      group = { title: t.slice(4), resources: [] };
      continue;
    }
    if (t.startsWith('- ')) {
      const r = parseResource(t, lang, section.num, n, err);
      if (r) group.resources.push(r);
      continue;
    }
    err(n, `Unexpected line inside section ${section.num}: "${t.slice(0, 60)}"`);
  }
  if (group.resources.length || group.title) section.groups.push(group);

  section.intro = introLines.join(' ');
  section.count = section.groups.reduce((c, g) => c + g.resources.length, 0);
  if (!section.declared) err(block.start, `Section ${section.num} has no "<summary><b>N resources</b></summary>" line.`);
  else if (section.declared.value !== section.count)
    err(
      section.declared.line,
      `Section ${section.num} says ${section.declared.value} resources but lists ${section.count}.`,
    );
  delete section.declared;
  return section;
}

function parseResource(t, lang, num, n, err) {
  const m = t.match(RESOURCE_RE);
  if (!m) {
    err(n, 'Resource does not match "- 🟢 [Title](https://link): Description." (see CONTRIBUTING.md).');
    return null;
  }
  const [, level, levelTo, title, url, colon, description] = m;
  if (lang === 'en' && colon !== ': ') err(n, 'Use ": " between the link and the description.');
  if (lang === 'zh' && colon !== '：') err(n, 'README_zh.md uses the full-width colon "：" after the link.');
  if (UNTAGGED_SECTIONS.has(num) && level) err(n, `Section ${num} entries are left untagged.`);
  if (!UNTAGGED_SECTIONS.has(num) && !level) err(n, 'Missing level tag (🟢, 🟡, or 🔴).');
  if (!END[lang].test(description.trim()))
    err(n, lang === 'zh' ? 'Description should end with "。".' : 'Description should end with a period.');
  return {
    level: level ? LEVELS[level] : null,
    levelTo: levelTo ? LEVELS[levelTo] : null,
    title,
    url,
    domain: domainOf(url),
    description: description.trim(),
    commercial: COMMERCIAL[lang].test(description),
  };
}

// Helpers
/** GitHub's heading anchor: lowercase, punctuation and emoji dropped, spaces to hyphens. */
export const githubSlug = (heading) =>
  heading
    .trim()
    .toLowerCase()
    .replace(/\uFE0F/g, '')
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '')
    .replace(/ /g, '-');
const stripHeading = (h) => (h ?? '').replace(/^##\s*/, '').trim();
function splitParagraphs(lines) {
  const out = [];
  let buf = [];
  for (const l of lines) {
    if (l.trim()) buf.push(l.trim());
    else if (buf.length) {
      out.push(buf.join(' '));
      buf = [];
    }
  }
  if (buf.length) out.push(buf.join(' '));
  return out;
}
const paragraphs = (block) =>
  block ? splitParagraphs(block.lines.map((l) => l.text)).filter((p) => p !== '---') : [];
const orderedList = (block) =>
  (block?.lines ?? [])
    .map((l) => l.text.match(/^\d+\. (.+)$/)?.[1])
    .filter(Boolean);

/** English and Chinese must list the same resources in the same sections. */
export function checkParity(en, zh) {
  const errors = [];
  const err = (message) => errors.push({ file: 'README_zh.md', line: 1, message });
  if (en.sections.length !== zh.sections.length)
    err(`README.md has ${en.sections.length} sections; README_zh.md has ${zh.sections.length}.`);
  en.sections.forEach((s, i) => {
    const z = zh.sections[i];
    if (!z) return;
    const urls = (x) => x.groups.flatMap((g) => g.resources.map((r) => r.url));
    const eu = urls(s);
    const zu = urls(z);
    // Compare occurrence counts, so a duplicated link on one side is caught too.
    const tally = (list) => list.reduce((m, u) => m.set(u, (m.get(u) ?? 0) + 1), new Map());
    const et = tally(eu);
    const zt = tally(zu);
    const missing = [...et].flatMap(([u, c]) => Array(Math.max(0, c - (zt.get(u) ?? 0))).fill(u));
    const extra = [...zt].flatMap(([u, c]) => Array(Math.max(0, c - (et.get(u) ?? 0))).fill(u));
    missing.forEach((u) => errors.push({ file: 'README_zh.md', line: z.line, message: `Section ${s.num} is missing ${u} (it is in README.md).` }));
    extra.forEach((u) => errors.push({ file: 'README_zh.md', line: z.line, message: `Section ${s.num} has ${u}, which README.md does not.` }));
    const levels = (x) => x.groups.flatMap((g) => g.resources.map((r) => `${r.url} ${r.level}→${r.levelTo}`));
    const el = new Set(levels(s));
    levels(z)
      .filter((l) => !el.has(l) && eu.includes(l.split(' ')[0]))
      .forEach((l) =>
        errors.push({ file: 'README_zh.md', line: z.line, message: `Section ${s.num}: level differs from README.md for ${l.split(' ')[0]}.` }),
      );
  });
  return errors;
}

/** Parse both READMEs from a repository root. */
export function loadAll(root = '.') {
  const read = (f) => readFileSync(`${root}/${f}`, 'utf8');
  const en = parseReadme(read('README.md'), { lang: 'en', file: 'README.md' });
  const zh = parseReadme(read('README_zh.md'), { lang: 'zh', file: 'README_zh.md' });
  // Slugs come from English, so /zh/ pages share paths with / pages.
  en.data.sections.forEach((s, i) => {
    s.slug = slugify(s.title);
    if (zh.data.sections[i]) zh.data.sections[i].slug = s.slug;
  });
  const errors = [...en.errors, ...zh.errors, ...checkParity(en.data, zh.data)];
  return { en: en.data, zh: zh.data, errors };
}
