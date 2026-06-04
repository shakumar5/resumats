globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as decodeKey } from './chunks/astro/server_BDgPnL1h.mjs';
import './chunks/astro-designed-error-pages_0M4vUWnX.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_D6imCkN6.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/shaik/Downloads/Testing/ResumeBuilder/","adapterName":"@astrojs/cloudflare","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"500.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"ats-score-checker/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ats-score-checker","isIndex":false,"type":"page","pattern":"^\\/ats-score-checker\\/?$","segments":[[{"content":"ats-score-checker","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ats-score-checker.astro","pathname":"/ats-score-checker","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"cover-letter-generator/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/cover-letter-generator","isIndex":false,"type":"page","pattern":"^\\/cover-letter-generator\\/?$","segments":[[{"content":"cover-letter-generator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cover-letter-generator.astro","pathname":"/cover-letter-generator","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"domain-converter/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/domain-converter","isIndex":false,"type":"page","pattern":"^\\/domain-converter\\/?$","segments":[[{"content":"domain-converter","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/domain-converter.astro","pathname":"/domain-converter","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy-policy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy-policy","isIndex":false,"type":"page","pattern":"^\\/privacy-policy\\/?$","segments":[[{"content":"privacy-policy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy-policy.astro","pathname":"/privacy-policy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"resume-keywords/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resume-keywords","isIndex":false,"type":"page","pattern":"^\\/resume-keywords\\/?$","segments":[[{"content":"resume-keywords","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resume-keywords.astro","pathname":"/resume-keywords","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"terms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://onlineresumats.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/ats-score-checker.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/cover-letter-generator.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/domain-converter.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/resume-keywords.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/500.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/privacy-policy.astro",{"propagation":"none","containsHead":true}],["C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/pages/terms.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/ats-score-checker@_@astro":"pages/ats-score-checker.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/cover-letter-generator@_@astro":"pages/cover-letter-generator.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/privacy-policy@_@astro":"pages/privacy-policy.astro.mjs","\u0000@astro-page:src/pages/resume-keywords@_@astro":"pages/resume-keywords.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/domain-converter@_@astro":"pages/domain-converter.astro.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C3t9pVHp.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.DKCl4B1d.js","/astro/hoisted.js?q=4":"_astro/hoisted.BGLN7T29.js","C:/Users/shaik/Downloads/Testing/ResumeBuilder/src/utils/pdfParser.ts":"_astro/pdfParser.DStAEUP2.js","C:/Users/shaik/Downloads/Testing/ResumeBuilder/node_modules/pdfjs-dist/build/pdf.mjs":"_astro/pdf.ksa_hnld.js","/astro/hoisted.js?q=0":"_astro/hoisted.Z7oHzvDa.js","/astro/hoisted.js?q=2":"_astro/hoisted.BtIptB2k.js","/astro/hoisted.js?q=3":"_astro/hoisted.CbONlfkN.js","/astro/hoisted.js?q=5":"_astro/hoisted.CFGQKINr.js","C:/Users/shaik/Downloads/Testing/ResumeBuilder/node_modules/pdf-lib/es/index.js":"_astro/index.CNoLVOj9.js","/astro/hoisted.js?q=6":"_astro/hoisted.COzg2ZH2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_astro/inter-latin-700-normal.Yt3aPRUw.woff2","/_astro/inter-latin-800-normal.BYj_oED-.woff2","/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/inter-latin-700-normal.BLAVimhd.woff","/_astro/inter-latin-800-normal.D1mf63XC.woff","/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_astro/about.CYTA_bla.css","/_astro/ats-score-checker.CRN6QP8S.css","/ads.txt","/favicon.svg","/og-image.svg","/robots.txt","/sitemap-0.xml","/sitemap-index.xml","/sitemap.xml","/_headers","/_astro/hoisted.BGLN7T29.js","/_astro/hoisted.BtIptB2k.js","/_astro/hoisted.CbONlfkN.js","/_astro/hoisted.CFGQKINr.js","/_astro/hoisted.COzg2ZH2.js","/_astro/hoisted.DKCl4B1d.js","/_astro/hoisted.Z7oHzvDa.js","/_astro/index.CNoLVOj9.js","/_astro/pdf.ksa_hnld.js","/_astro/pdfParser.DStAEUP2.js","/_astro/ToolLayout.astro_astro_type_script_index_0_lang.bFhXMfK2.js","/_worker.js/index.js","/_worker.js/renderers.mjs","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/chunks/astro-designed-error-pages_0M4vUWnX.mjs","/_worker.js/chunks/astro_Cn6PyzXN.mjs","/_worker.js/chunks/BaseLayout_DskxhWHa.mjs","/_worker.js/chunks/noop-middleware_D6imCkN6.mjs","/_worker.js/chunks/render-context_lSWQhegl.mjs","/_worker.js/chunks/ToolLayout_BPIZCrel.mjs","/_worker.js/_astro/about.CYTA_bla.css","/_worker.js/_astro/ats-score-checker.CRN6QP8S.css","/_worker.js/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_worker.js/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_worker.js/_astro/inter-latin-500-normal.BL9OpVg8.woff","/_worker.js/_astro/inter-latin-500-normal.Cerq10X2.woff2","/_worker.js/_astro/inter-latin-600-normal.CiBQ2DWP.woff","/_worker.js/_astro/inter-latin-600-normal.LgqL8muc.woff2","/_worker.js/_astro/inter-latin-700-normal.BLAVimhd.woff","/_worker.js/_astro/inter-latin-700-normal.Yt3aPRUw.woff2","/_worker.js/_astro/inter-latin-800-normal.BYj_oED-.woff2","/_worker.js/_astro/inter-latin-800-normal.D1mf63XC.woff","/_worker.js/pages/404.astro.mjs","/_worker.js/pages/500.astro.mjs","/_worker.js/pages/about.astro.mjs","/_worker.js/pages/ats-score-checker.astro.mjs","/_worker.js/pages/contact.astro.mjs","/_worker.js/pages/cover-letter-generator.astro.mjs","/_worker.js/pages/domain-converter.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/privacy-policy.astro.mjs","/_worker.js/pages/resume-keywords.astro.mjs","/_worker.js/pages/terms.astro.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/chunks/astro/env-setup_nxDOIah1.mjs","/_worker.js/chunks/astro/server_BDgPnL1h.mjs","/404.html","/500.html","/about/index.html","/ats-score-checker/index.html","/contact/index.html","/cover-letter-generator/index.html","/domain-converter/index.html","/privacy-policy/index.html","/resume-keywords/index.html","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"muquX7Douak5kA6xxkw04B2/IhqS7T7EJa7LMzN2My4=","experimentalEnvGetSecretEnabled":false});

export { manifest };
