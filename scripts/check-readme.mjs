#!/usr/bin/env node
// Checks README.md and README_zh.md against CONTRIBUTING.md.
//   node scripts/check-readme.mjs              report problems, exit 1 if any
//   node scripts/check-readme.mjs --json out   also write the parsed data (the website reads it)

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from './readme.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { en, zh, errors } = loadAll(root);

const out = process.argv.indexOf('--json');
if (out !== -1) {
  const file = resolve(process.argv[out + 1] ?? 'readme.json');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ en, zh }, null, 2) + '\n');
}

if (errors.length) {
  const gh = process.env.GITHUB_ACTIONS === 'true';
  for (const e of errors) {
    console.error(gh ? `::error file=${e.file},line=${e.line}::${e.message}` : `${e.file}:${e.line}  ${e.message}`);
  }
  console.error(`\n${errors.length} problem${errors.length === 1 ? '' : 's'} found. See CONTRIBUTING.md.`);
  process.exit(1);
}
console.log(`README.md and README_zh.md are in order: ${en.sections.length} sections, ${en.count} resources each.`);
