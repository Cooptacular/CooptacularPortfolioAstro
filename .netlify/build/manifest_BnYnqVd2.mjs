import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_D685xlUw.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

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
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/","cacheDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/node_modules/.astro/","outDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/dist/","srcDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/src/","publicDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/public/","buildClientDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/dist/","buildServerDir":"file:///Users/bryancooper/Desktop/github%20projects%20(local)/CooptacularPortfolio/galactic-gravity/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"categories/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/categories","isIndex":false,"type":"page","pattern":"^\\/categories\\/?$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories.astro","pathname":"/categories","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"photography/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/photography","isIndex":false,"type":"page","pattern":"^\\/photography\\/?$","segments":[[{"content":"photography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photography.astro","pathname":"/photography","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"search.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/search.json","isIndex":false,"type":"endpoint","pattern":"^\\/search\\.json\\/?$","segments":[[{"content":"search.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.json.js","pathname":"/search.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://cooptacular.github.io","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/blog/[...slug].astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/categories.astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/categories/[category].astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/photography.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/categories/[category]@_@astro":"pages/categories/_category_.astro.mjs","\u0000@astro-page:src/pages/categories@_@astro":"pages/categories.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/photography@_@astro":"pages/photography.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/search.json@_@js":"pages/search.json.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BnYnqVd2.mjs","/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/photography.astro?astro&type=script&index=0&lang.ts":"_astro/photography.astro_astro_type_script_index_0_lang.BlWF763o.js","/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.e0HfgZB2.js","/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/TableOfContents.astro?astro&type=script&index=0&lang.ts":"_astro/TableOfContents.astro_astro_type_script_index_0_lang.zrgUHBA8.js","/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.B-49ISco.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/pages/photography.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const c=document.querySelectorAll(\".gallery-item\"),e=document.getElementById(\"lightbox\"),n=document.querySelector(\".lightbox-content\"),d=document.querySelector(\".close\");c.forEach(t=>{t.addEventListener(\"click\",()=>{n&&(n.src=t.src,e?.classList.remove(\"hidden\"))})}),d?.addEventListener(\"click\",()=>{e&&e.classList.add(\"hidden\")}),e?.addEventListener(\"click\",t=>{t.target===e&&e.classList.add(\"hidden\")})});"],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/Header.astro?astro&type=script&index=0&lang.ts","function m(){const e=document.getElementById(\"hamburger-toggle\"),t=document.getElementById(\"mobile-menu\"),a=document.body;if(!e||!t)return;e.addEventListener(\"click\",()=>{t.classList.contains(\"active\")?(t.classList.remove(\"active\"),e.setAttribute(\"aria-expanded\",\"false\"),a.style.overflow=\"\"):(t.classList.add(\"active\"),e.setAttribute(\"aria-expanded\",\"true\"),a.style.overflow=\"hidden\")}),t.querySelectorAll(\".mobile-nav-link\").forEach(n=>{n.addEventListener(\"click\",()=>{t.classList.remove(\"active\"),e.setAttribute(\"aria-expanded\",\"false\"),a.style.overflow=\"\"})}),document.addEventListener(\"keydown\",n=>{n.key===\"Escape\"&&t.classList.contains(\"active\")&&(t.classList.remove(\"active\"),e.setAttribute(\"aria-expanded\",\"false\"),a.style.overflow=\"\")})}let d=[],i,r,c;async function h(){try{d=await(await fetch(\"/search.json\")).json()}catch(e){console.error(\"Failed to load search data:\",e)}i=document.getElementById(\"search-overlay\"),r=document.getElementById(\"search-input\"),c=document.getElementById(\"search-results\"),document.getElementById(\"search-toggle\")?.addEventListener(\"click\",v),document.getElementById(\"search-close\")?.addEventListener(\"click\",l),r?.addEventListener(\"input\",f),document.addEventListener(\"keydown\",e=>{e.key===\"Escape\"&&i?.classList.contains(\"active\")&&l()}),i?.addEventListener(\"click\",e=>{e.target===i&&l()})}function v(){i?.classList.add(\"active\"),document.body.style.overflow=\"hidden\",setTimeout(()=>r?.focus(),100)}function l(){i?.classList.remove(\"active\"),document.body.style.overflow=\"\",r&&(r.value=\"\"),c&&(c.innerHTML=\"\")}function f(e){const a=e.target.value.toLowerCase().trim();if(a.length<2){c&&(c.innerHTML=\"\");return}const s=d.filter(n=>n.title.toLowerCase().includes(a)||n.excerpt.toLowerCase().includes(a)||n.categories&&n.categories.some(u=>u.toLowerCase().includes(a))).slice(0,10);g(s,a)}function g(e,t){if(e.length===0){c&&(c.innerHTML=`\n          <div class=\"search-no-results\">\n            <p>No articles found for \"${t}\"</p>\n          </div>\n        `);return}const a=e.map(s=>`\n      <article class=\"search-result\">\n        <h3 class=\"search-result-title\">\n          <a href=\"/${s.url.startsWith(\"/\")?s.url.slice(1):s.url}\">${s.title}</a>\n        </h3>\n        <time class=\"search-result-date\">${new Date(s.date).toLocaleDateString(\"en-US\",{year:\"numeric\",month:\"long\",day:\"numeric\"})}</time>\n        ${s.excerpt?`<p class=\"search-result-excerpt\">${s.excerpt}</p>`:\"\"}\n        ${s.categories?`\n          <div class=\"search-result-categories\">\n            ${s.categories.map(n=>`<span class=\"search-category\">${n}</span>`).join(\" \")}\n          </div>\n        `:\"\"}\n      </article>\n    `).join(\"\");c&&(c.innerHTML=`\n        <div class=\"search-results-header\">\n          <p>Found ${e.length} article${e.length===1?\"\":\"s\"} for \"${t}\"</p>\n        </div>\n        ${a}\n      `)}function o(){m(),h()}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",o):o();"],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/TableOfContents.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".toc-link\").forEach(e=>{e.addEventListener(\"click\",c=>{c.preventDefault();const t=e.getAttribute(\"href\")?.slice(1),o=t?document.getElementById(t):null;o&&(o.scrollIntoView({behavior:\"smooth\",block:\"start\"}),history.pushState(null,\"\",`#${t}`))})});const r={rootMargin:\"-20% 0px -70% 0px\"},n=e=>{e.forEach(c=>{const t=c.target.getAttribute(\"id\"),o=document.querySelector(`.toc-link[href=\"#${t}\"]`);o&&c.isIntersecting&&(document.querySelectorAll(\".toc-link\").forEach(i=>{i.classList.remove(\"active\")}),o.classList.add(\"active\"))})},s=new IntersectionObserver(n,r);document.querySelectorAll(\"h2[id], h3[id]\").forEach(e=>{s.observe(e)})});"],["/Users/bryancooper/Desktop/github projects (local)/CooptacularPortfolio/galactic-gravity/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"theme-toggle\");function c(e){document.documentElement.dataset.theme=e,localStorage.setItem(\"theme\",e)}n?.addEventListener(\"click\",()=>{const t=(document.documentElement.dataset.theme||\"light\")===\"light\"?\"dark\":\"light\";c(t)});"]],"assets":["/_astro/oswald-vietnamese-300-normal.CdoSkO8l.woff2","/_astro/oswald-cyrillic-ext-300-normal.uypPFyUW.woff2","/_astro/oswald-cyrillic-300-normal.CRE1E3Ji.woff2","/_astro/oswald-latin-ext-300-normal.lQbcWmyx.woff2","/_astro/oswald-latin-300-normal.QebaMWMV.woff2","/_astro/oswald-cyrillic-600-normal.BpsqcLw0.woff2","/_astro/oswald-cyrillic-ext-600-normal.DJv8RkPb.woff2","/_astro/oswald-vietnamese-600-normal.h0z1RevK.woff2","/_astro/oswald-latin-ext-600-normal.Dgqdru3u.woff2","/_astro/roboto-condensed-cyrillic-300-normal.QTn5iNZY.woff2","/_astro/roboto-condensed-cyrillic-ext-300-normal.CHAntAsm.woff2","/_astro/oswald-latin-600-normal.DJErOaIx.woff2","/_astro/roboto-condensed-greek-300-normal.DPINAAPo.woff2","/_astro/oswald-cyrillic-ext-500-normal.DngHVvy4.woff2","/_astro/roboto-condensed-latin-ext-300-normal.Dv3u2v9N.woff2","/_astro/oswald-cyrillic-500-normal.Tnkmz75U.woff2","/_astro/oswald-vietnamese-500-normal.hXcn5ojQ.woff2","/_astro/oswald-latin-ext-500-normal.B8WATObP.woff2","/_astro/roboto-condensed-latin-300-normal.obJDv80q.woff2","/_astro/oswald-latin-500-normal.DLGeGMRY.woff2","/_astro/roboto-condensed-vietnamese-300-normal.Dg-rbDRZ.woff2","/_astro/roboto-condensed-cyrillic-400-normal._T2aQlWs.woff2","/_astro/roboto-condensed-cyrillic-ext-400-normal.DGo1Ayjq.woff2","/_astro/roboto-condensed-latin-ext-400-normal.OHaX69iP.woff2","/_astro/roboto-condensed-greek-400-normal.D5vBSIyg.woff2","/_astro/roboto-condensed-vietnamese-400-normal.0o1laQ-g.woff2","/_astro/oswald-cyrillic-ext-400-normal.DaQSmjrl.woff2","/_astro/oswald-cyrillic-400-normal.B1Eg5eej.woff2","/_astro/oswald-latin-ext-400-normal.CFWc8MuB.woff2","/_astro/roboto-condensed-latin-400-normal.BICmKrXV.woff2","/_astro/work-sans-vietnamese-400-normal.BxGuknnG.woff2","/_astro/oswald-latin-400-normal.CuYuZIQz.woff2","/_astro/work-sans-latin-400-normal.CzmC_l3Q.woff2","/_astro/work-sans-latin-ext-400-normal.CjUdILUK.woff2","/_astro/roboto-condensed-cyrillic-ext-700-normal.B8GjxRsv.woff2","/_astro/roboto-condensed-vietnamese-700-normal.GfzVdwEJ.woff2","/_astro/roboto-condensed-greek-700-normal._6cgmXrz.woff2","/_astro/roboto-condensed-latin-ext-700-normal.ut7YLPMk.woff2","/_astro/roboto-condensed-cyrillic-700-normal.0WZ-j1HJ.woff2","/_astro/oswald-cyrillic-ext-700-normal.CtkJES1U.woff2","/_astro/roboto-condensed-latin-700-normal.PG4A5VXg.woff2","/_astro/oswald-cyrillic-700-normal.mF2xyKoD.woff2","/_astro/oswald-latin-700-normal.DN1cn8ZJ.woff2","/_astro/work-sans-latin-ext-600-normal.DyT_Ynsz.woff2","/_astro/oswald-vietnamese-700-normal._DkZZ6ID.woff2","/_astro/oswald-latin-ext-700-normal.BCBCFRzo.woff2","/_astro/work-sans-latin-ext-500-normal.CSIzHsC_.woff2","/_astro/work-sans-vietnamese-600-normal.DizFELYt.woff2","/_astro/work-sans-vietnamese-500-normal.Czn2Xkog.woff2","/_astro/work-sans-latin-600-normal.CQPKeRTL.woff2","/_astro/work-sans-latin-500-normal.HaXOagro.woff2","/_astro/jetbrains-mono-greek-400-normal.C190GLew.woff2","/_astro/jetbrains-mono-cyrillic-400-normal.BEIGL1Tu.woff2","/_astro/jetbrains-mono-latin-ext-400-normal.Bc8Ftmh3.woff2","/_astro/jetbrains-mono-cyrillic-700-normal.BWTpRfYl.woff2","/_astro/jetbrains-mono-greek-700-normal.C6CZE3T8.woff2","/_astro/jetbrains-mono-latin-400-normal.V6pRDFza.woff2","/_astro/jetbrains-mono-latin-ext-700-normal.CZipNAKV.woff2","/_astro/jetbrains-mono-latin-700-normal.BYuf6tUa.woff2","/_astro/oswald-latin-ext-300-normal.C4-H3Awc.woff","/_astro/oswald-vietnamese-300-normal.BOujjSKd.woff","/_astro/oswald-cyrillic-ext-300-normal.Cu1hRHSJ.woff","/_astro/oswald-cyrillic-300-normal.DvfHxT-Z.woff","/_astro/oswald-cyrillic-600-normal.CGJkMSMP.woff","/_astro/oswald-latin-ext-600-normal.BXR13jL1.woff","/_astro/oswald-cyrillic-ext-600-normal.CXH_3Vsf.woff","/_astro/roboto-condensed-cyrillic-300-normal.DI1GIr4Y.woff","/_astro/oswald-latin-300-normal.7pbZLwTq.woff","/_astro/roboto-condensed-cyrillic-ext-300-normal.C_abyGeD.woff","/_astro/oswald-latin-600-normal.s3xkiiH5.woff","/_astro/roboto-condensed-greek-300-normal.D1nyLJAf.woff","/_astro/oswald-vietnamese-600-normal.CH5CIKWT.woff","/_astro/roboto-condensed-latin-ext-300-normal.B5OK47Wl.woff","/_astro/oswald-cyrillic-500-normal.CFYlid-Q.woff","/_astro/oswald-cyrillic-ext-500-normal.Hz7kEHBT.woff","/_astro/oswald-latin-ext-500-normal.DD7Er1UL.woff","/_astro/oswald-latin-500-normal.Be3kkpLU.woff","/_astro/roboto-condensed-vietnamese-300-normal.BBGk7EeW.woff","/_astro/oswald-vietnamese-500-normal.Bi4XG4HV.woff","/_astro/roboto-condensed-cyrillic-400-normal.Bgns473E.woff","/_astro/roboto-condensed-latin-300-normal.CGUgNzTJ.woff","/_astro/roboto-condensed-cyrillic-ext-400-normal.WtM1l1qc.woff","/_astro/roboto-condensed-latin-ext-400-normal.DT8nEsYA.woff","/_astro/roboto-condensed-greek-400-normal.FabMgVmk.woff","/_astro/roboto-condensed-vietnamese-400-normal.CPsdS8_S.woff","/_astro/oswald-cyrillic-ext-400-normal.BkkDEomt.woff","/_astro/roboto-condensed-latin-400-normal.D2e7XwB1.woff","/_astro/oswald-latin-ext-400-normal.EQcLd6tF.woff","/_astro/oswald-cyrillic-400-normal.BF--n91Y.woff","/_astro/oswald-vietnamese-400-normal.BupuUjkp.woff","/_astro/oswald-latin-400-normal.DedbwDDS.woff","/_astro/work-sans-vietnamese-400-normal.DFZk_KN_.woff","/_astro/work-sans-latin-400-normal.DtsoZsT4.woff","/_astro/work-sans-latin-ext-400-normal.BU0CIkwa.woff","/_astro/roboto-condensed-cyrillic-ext-700-normal.CEGB0TPl.woff","/_astro/roboto-condensed-vietnamese-700-normal.CBf6sN5u.woff","/_astro/roboto-condensed-latin-ext-700-normal.ojr4csCx.woff","/_astro/roboto-condensed-greek-700-normal.DGgGwrO0.woff","/_astro/roboto-condensed-cyrillic-700-normal.B5ylDdvJ.woff","/_astro/roboto-condensed-latin-700-normal.T39p5Q7h.woff","/_astro/oswald-cyrillic-700-normal.BQ813p5_.woff","/_astro/work-sans-latin-ext-600-normal.ORLcKJbx.woff","/_astro/oswald-cyrillic-ext-700-normal.VKAui8kQ.woff","/_astro/oswald-vietnamese-700-normal.BxFoeH7J.woff","/_astro/oswald-latin-ext-700-normal.DdeWfMZb.woff","/_astro/oswald-latin-700-normal.CizqJC4i.woff","/_astro/work-sans-vietnamese-600-normal.ue5fzGW6.woff","/_astro/work-sans-latin-ext-500-normal.Dv67y7uO.woff","/_astro/work-sans-vietnamese-500-normal.90nhZfxs.woff","/_astro/jetbrains-mono-cyrillic-400-normal.ugxPyKxw.woff","/_astro/work-sans-latin-600-normal.D3vJm26l.woff","/_astro/work-sans-latin-500-normal.twoPaw1m.woff","/_astro/jetbrains-mono-vietnamese-400-normal.CqNFfHCs.woff","/_astro/jetbrains-mono-latin-ext-400-normal.fXTG6kC5.woff","/_astro/jetbrains-mono-cyrillic-700-normal.CEoEElIJ.woff","/_astro/jetbrains-mono-greek-700-normal.DEigVDxa.woff","/_astro/jetbrains-mono-greek-400-normal.B9oWc5Lo.woff","/_astro/jetbrains-mono-latin-400-normal.6-qcROiO.woff","/_astro/jetbrains-mono-vietnamese-700-normal.BDLVIk2r.woff","/_astro/jetbrains-mono-latin-700-normal.D3wTyLJW.woff","/_astro/jetbrains-mono-latin-ext-700-normal.CxPITLHs.woff","/_astro/_slug_.B4kzX0B1.css","/_astro/about.BB6_YYlB.css","/_astro/index.DkB10EEj.css","/_astro/photography.B-vC-HEU.css","/favicon.svg","/search.json","/site-title.svg","/theme-init.js","/gallery/IMG_9216-2.jpg","/gallery/P1078082.jpg","/gallery/P1078107.jpg","/gallery/P1078119.jpg","/gallery/P1088138.jpg","/about/index.html","/blog/index.html","/categories/index.html","/contact/index.html","/photography/index.html","/rss.xml","/search.json","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"coUjS6tq1+tn1Q0BqOssHbgi+AJMHMc59/uyqlbn+/4=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
