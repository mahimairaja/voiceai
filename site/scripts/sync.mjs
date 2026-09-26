// Builds the site's data from the READMEs. The READMEs are the product: every word and link on
// the site comes from them through ../scripts/readme.mjs, the same parser CI uses to check them.
// A README that breaks CONTRIBUTING.md stops the build here, so the site never shows one.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { loadAll } from '../../scripts/readme.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const site = resolve(here, '..');

const { en, zh, errors } = loadAll(repo);
if (errors.length) {
  for (const e of errors) console.error(`${e.file}:${e.line}  ${e.message}`);
  console.error(`\nThe READMEs have ${errors.length} problem(s). Fix them before building the site.`);
  process.exit(1);
}

// Level names as each README writes them in its intro ("**🟢 Beginner**", "**🟢 入门**").
for (const data of [en, zh]) {
  data.levelNames = Object.fromEntries(
    [...data.hero.levels.matchAll(/\*\*(🟢|🟡|🔴) ([^*]+)\*\*/gu)].map(([, e, name]) => [
      { '🟢': 'beginner', '🟡': 'intermediate', '🔴': 'advanced' }[e],
      name.trim(),
    ]),
  );
}

// Stars, for the header. Optional: a failed request leaves the count out.
let stars = null;
try {
  const res = await fetch('https://api.github.com/repos/mahimairaja/voiceai', {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'voiceai-site' },
    signal: AbortSignal.timeout(8000),
  });
  if (res.ok) stars = (await res.json()).stargazers_count ?? null;
} catch {
  // offline or rate limited
}

mkdirSync(resolve(site, 'src/data'), { recursive: true });
writeFileSync(
  resolve(site, 'src/data/readme.json'),
  JSON.stringify({ en, zh, stars, builtAt: new Date().toISOString() }, null, 2) + '\n',
);

// Social card: the repository's own banner, framed at 1200 x 630.
mkdirSync(resolve(site, 'public'), { recursive: true });
await sharp(resolve(repo, 'docs/assets/banner-dark.webp'))
  .resize(1200, 630, { fit: 'contain', background: '#0a0a0a' })
  .png()
  .toFile(resolve(site, 'public/og.png'));

console.log(`Synced ${en.sections.length} sections, ${en.count} resources (en + zh). Stars: ${stars ?? 'unknown'}.`);
