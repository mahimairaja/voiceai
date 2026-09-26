// Everything the pages say comes from the READMEs (src/data/readme.json, written by
// scripts/sync.mjs). The only words that live here are the site's own chrome: navigation,
// filter labels, and the like. Both languages are kept side by side so neither drifts.
import readme from '../data/readme.json';

export type Lang = 'en' | 'zh';
export type Data = typeof readme.en;
export type Section = Data['sections'][number];
export type Resource = Section['groups'][number]['resources'][number];

export const data = (lang: Lang): Data => readme[lang] as Data;
export const stars = readme.stars as number | null;
export const REPO = 'https://github.com/mahimairaja/voiceai';

export const htmlLang = (lang: Lang) => (lang === 'zh' ? 'zh-CN' : 'en');
export const href = (lang: Lang, path = '') => `${lang === 'zh' ? '/zh' : ''}/${path}`.replace(/\/+$/, '/');
export const sectionHref = (lang: Lang, s: Pick<Section, 'slug'>) => href(lang, `${s.slug}/`);

export const UI = {
  en: {
    sections: 'Sections',
    path: 'Learning path',
    search: 'Search',
    github: 'GitHub',
    searchPlaceholder: (n: number) => `Search ${n} resources by name, topic, or site`,
    allLevels: 'All levels',
    allGroups: 'All',
    commercial: 'Commercial author',
    noResults: 'Nothing matches. Try a shorter word.',
    showing: '{n} of {total}',
    showingAll: '{total} resources',
    showMore: 'Show more',
    open: 'Open section',
    inSection: 'In',
    prev: 'Previous',
    next: 'Next',
    weekSections: 'Sections',
    stack: 'The pipeline',
    stackHint: 'Every real call runs through these parts. Pick one to see where to start.',
    sectionsHint: 'The whole list, in the order you learn it.',
    findTitle: 'Find a resource',
    findHint: 'Every entry from the README, in one place.',
    readme: 'Read the README',
    edit: 'Suggest a resource',
    onGithub: 'on GitHub',
    home: 'Voice AI',
    stats: { resources: 'resources', sections: 'sections', languages: 'EN + 中文' },
    footer: 'Built from README.md. Edit the README and this site follows.',
    level: 'Level',
    theme: 'Color theme',
    language: 'Language',
    madeBy: 'Maintained by',
  },
  zh: {
    sections: '章节',
    path: '学习路径',
    search: '搜索',
    github: 'GitHub',
    searchPlaceholder: (n: number) => `按名称、主题或网站搜索 ${n} 项资源`,
    allLevels: '全部难度',
    allGroups: '全部',
    commercial: '商业作者',
    noResults: '没有匹配结果，试试更短的关键词。',
    showing: '{n} / {total}',
    showingAll: '{total} 项资源',
    showMore: '显示更多',
    open: '打开章节',
    inSection: '所属',
    prev: '上一节',
    next: '下一节',
    weekSections: '章节',
    stack: '语音流水线',
    stackHint: '每一通真实通话都会经过这些环节。选一个，看看从哪里开始。',
    sectionsHint: '完整清单，按学习顺序排列。',
    findTitle: '查找资源',
    findHint: 'README 中的全部条目，集中在这里。',
    readme: '阅读 README',
    edit: '推荐资源',
    onGithub: '（GitHub）',
    home: 'Voice AI',
    stats: { resources: '项资源', sections: '个章节', languages: 'EN + 中文' },
    footer: '由 README_zh.md 生成。修改 README，本站随之更新。',
    level: '难度',
    theme: '颜色主题',
    language: '语言',
    madeBy: '维护者',
  },
} as const;

/**
 * Where a README link goes on the site: "#-6-voice-activity..." anchors become section pages,
 * repository files (CONTRIBUTING.md, LICENSE) go to GitHub, everything else is unchanged.
 */
export function siteUrl(lang: Lang, url: string): string {
  const section = url.match(/^#-(\d+)-/);
  if (section) {
    const s = data(lang).sections[Number(section[1]) - 1];
    if (s) return sectionHref(lang, s);
  }
  if (/^\.?\/?[\w-]+\.md$|^\.?\/?LICENSE$/.test(url)) return `${REPO}/blob/main/${url.replace(/^\.?\//, '')}`;
  return url;
}

/** Inline Markdown from the README: links, bold, italics, and code. Escapes everything else. */
export function md(text: string, lang?: Lang, { links = true } = {}): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const code: string[] = [];
  let out = esc(text).replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(c) - 1}\u0000`);
  out = out
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|[\w./#-][^\s)]*)\)/g, (_, t, u) => {
      if (!links) return t;
      const url = lang ? siteUrl(lang, u) : u;
      const external = /^https?:/.test(url);
      return `<a href="${url}"${external ? ' rel="noopener" target="_blank"' : ''}>${t}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(（])_(.+?)_(?=[\s).,，。）]|$)/g, '$1<em>$2</em>')
    .replace(/(^|[\s(（])\*(?!\*)(.+?)\*(?=[\s).,，。）]|$)/g, '$1<em>$2</em>');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${code[Number(i)]}</code>`);
}

/** Level counts for a list of resources. */
export function levelSplit(resources: Resource[]) {
  const out = { beginner: 0, intermediate: 0, advanced: 0 };
  for (const r of resources) if (r.level) out[r.level as keyof typeof out]++;
  return out;
}
export const resourcesOf = (s: Section) => s.groups.flatMap((g) => g.resources);

/** Short label for a section: the parenthetical if it has one ("STT / ASR"), else the title. */
export const shortTitle = (s: Section) => s.title.match(/[（(](.+?)[）)]$/)?.[1] ?? s.title;

const plain = (m: string) => m.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');

/** Entries as the finder island wants them: description pre-rendered, section attached. */
export function finderItems(lang: Lang, sections: Section[]) {
  return sections.flatMap((s) =>
    s.groups.flatMap((g) =>
      g.resources.map((r) => ({
        title: r.title,
        url: r.url,
        domain: r.domain,
        html: md(r.description, lang),
        text: plain(r.description),
        level: r.level,
        levelTo: r.levelTo,
        commercial: r.commercial,
        group: g.title,
        section: { num: s.num, title: s.title, href: sectionHref(lang, s) },
      })),
    ),
  );
}

export function finderLabels(lang: Lang, total: number) {
  const t = UI[lang];
  return {
    placeholder: t.searchPlaceholder(total),
    allLevels: t.allLevels,
    allGroups: t.allGroups,
    commercial: t.commercial,
    noResults: t.noResults,
    showMore: t.showMore,
    levelNames: data(lang).levelNames as Record<string, string>,
    showing: t.showing,
    showingAll: t.showingAll,
    level: t.level,
  };
}

// The pipeline from the README intro: transport, cleanup, turn-taking, STT, LLM, TTS. Each stop
// points at README sections by number; section 2 (frameworks) wires them together.
const STOPS = [
  { key: 'transport', icon: 'transport', nums: [8, 9] },
  { key: 'clean', icon: 'clean', nums: [7] },
  { key: 'turn', icon: 'turn', nums: [6] },
  { key: 'stt', icon: 'stt', nums: [3] },
  { key: 'llm', icon: 'llm', nums: [5] },
  { key: 'tts', icon: 'tts', nums: [4] },
] as const;

export function pipelineStops(lang: Lang) {
  const d = data(lang);
  const names = d.levelNames as Record<string, string>;
  const stop = (key: string, icon: string, nums: readonly number[]) => ({
    key,
    icon,
    sections: nums.map((n) => {
      const s = d.sections[n - 1]!;
      return {
        num: s.num,
        title: s.title,
        href: sectionHref(lang, s),
        introHtml: md(s.intro, lang),
        countLabel: s.countLabel,
        picksHeader: s.picksHeader,
        picks: s.picks,
        top: resourcesOf(s)
          .slice(0, 3)
          .map((r) => ({ title: r.title, url: r.url, domain: r.domain, level: r.level, levelName: r.level ? names[r.level]! : null })),
      };
    }),
  });
  return { stops: STOPS.map((x) => stop(x.key, x.icon, x.nums)), band: stop('frameworks', 'frameworks', [2]) };
}
