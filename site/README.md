# voiceai.mahimai.ca

The website for this list. It has no content of its own: `npm run sync` parses `../README.md`
and `../README_zh.md` with `../scripts/readme.mjs` (the same parser the README check uses) into
`src/data/readme.json`, and every page renders from that. English is served at `/`, Chinese at
`/zh/`. Edit a README and the site follows on the next deploy.

```
npm install
npm run dev      # sync, then the dev server
npm run build    # sync, then a static build in dist/
```

The build stops if either README fails `node ../scripts/check-readme.mjs`.

Deployed on Cloudflare Workers static assets (`wrangler.jsonc`): root directory `site`, build
command `npm run build`, deploy command `npx wrangler deploy`.
