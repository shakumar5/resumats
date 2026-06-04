globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { createExports } from './_@astrojs-ssr-adapter.mjs';
import { manifest } from './manifest_C3t9pVHp.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/about.astro.mjs');
const _page4 = () => import('./pages/ats-score-checker.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/cover-letter-generator.astro.mjs');
const _page7 = () => import('./pages/domain-converter.astro.mjs');
const _page8 = () => import('./pages/privacy-policy.astro.mjs');
const _page9 = () => import('./pages/resume-keywords.astro.mjs');
const _page10 = () => import('./pages/terms.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/about.astro", _page3],
    ["src/pages/ats-score-checker.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/cover-letter-generator.astro", _page6],
    ["src/pages/domain-converter.astro", _page7],
    ["src/pages/privacy-policy.astro", _page8],
    ["src/pages/resume-keywords.astro", _page9],
    ["src/pages/terms.astro", _page10],
    ["src/pages/index.astro", _page11]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
