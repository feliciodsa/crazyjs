import { Render } from "../fn/index.js";
import { ReaxUI } from "./ReaxUI.js";
import { Link } from "./Link.js";

const parseQuery = (qs) => {
    const obj = {};
    if (!qs) return obj;
    const s = qs.replace(/^\?/, "");
    if (!s) return obj;
    s.split("&").forEach(pair => {
        if (!pair) return;
        const [k, v = ""] = pair.split("=");
        obj[decodeURIComponent(k)] = decodeURIComponent(v);
    });
    return obj;
};

const compile = (pattern = "/") => {
    const keys = [];
    const clean = pattern === "/" ? "/" : pattern.replace(/\/+$/, "");
    const rx = "^" + clean
        .replace(/\//g, "\\/")
        .replace(/:(\w+)/g, (_m, k) => { keys.push(k); return "([^/]+)"; })
        .replace(/\*/g, ".*")
        + "$";
    return { regex: new RegExp(rx), keys };
};

// Simple in-memory cache for fetched HTML
const __htmlCache = new Map();

const sanitizeHtml = (html, { allowScripts = false } = {}) => {
    if (allowScripts) return html;
    // remove <script>...</script>
    return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
};

const toNodes = (html, { allowScripts = false } = {}) => {
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    const fragment = tpl.content.cloneNode(true);
    if (allowScripts) {
        // re-execute scripts by cloning them
        fragment.querySelectorAll("script").forEach(old => {
            const s = document.createElement("script");
            // copy attributes (type, src, etc.)
            for (const attr of old.attributes) s.setAttribute(attr.name, attr.value);
            s.textContent = old.textContent;
            old.replaceWith(s);
        });
    }
    return fragment;
};

const loadHtml = async (url, { cache = true, allowScripts = false, fetchOptions = {} } = {}) => {
    const key = JSON.stringify({ url, allowScripts });
    if (cache && __htmlCache.has(key)) {
        return __htmlCache.get(key).cloneNode(true);
    }
    const res = await fetch(url, { cache: cache ? "default" : "no-store", ...fetchOptions });
    if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar ${url}`);
    const text = await res.text();
    const safe = sanitizeHtml(text, { allowScripts });
    const nodes = toNodes(safe, { allowScripts });
    if (cache) __htmlCache.set(key, nodes.cloneNode(true));
    return nodes;
};

export const Router = ({
    routes = [],            // [{ path, view? , html?: string | (ctx)=>string , allowScripts?, cache?, fetchOptions?, beforeEnter? }]
    notFound = () => ReaxUI("div", [
        "404 — rota não encontrada. ",
        Link({ href: "#/", text: "Voltar ao início" })
    ]),
    mode = "hash",
    base = "",
    mount = null,
    scrollTop = true,
    beforeEach,
    afterEach,
    // feedback UIs
    loading = () => ReaxUI("div", ["Carregando..."]),
    onError = (err) => ReaxUI("div", [`Erro ao carregar página: ${err.message || err}`]),
} = {}) => {
    const el = ReaxUI("div", [], { id: "router-view" });
    const table = routes.map(r => ({ ...r, ...compile(r.path || "/") }));

    const getLoc = () => {
        if (mode === "hash") {
            let hash = (location.hash || "#/").replace(/^#/, "");
            if (!hash) hash = "/";
            const [p, q] = hash.split("?");
            const path = p || "/";
            return { path, query: parseQuery(q), fullPath: "#" + (hash || "/") };
        } else {
            let path = location.pathname || "/";
            if (base && path.startsWith(base)) path = path.slice(base.length) || "/";
            return { path, query: parseQuery(location.search), fullPath: location.pathname + location.search };
        }
    };

    const resolve = (path) => {
        const norm = path === "/" ? "/" : path.replace(/\/+$/, "");
        for (const r of table) {
            const m = norm.match(r.regex);
            if (m) {
                const params = {};
                r.keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1] || ""));
                return { route: r, params };
            }
        }
        return { route: null, params: {} };
    };

    const mountNodes = (nodes) => {
        const target = mount || el;
        const arr = Array.isArray(nodes) ? nodes : [nodes];
        Render(window.components, arr, { mount: target, clear: true });
        if (scrollTop) window.scrollTo(0, 0);
    };

    let current = { path: null, params: {}, query: {}, route: null };

    const onChange = async () => {
        const loc = getLoc();
        const { route, params } = resolve(loc.path);
        const to = { path: loc.path, params, query: loc.query, route };
        const from = current;

        if (beforeEach && beforeEach(to, from) === false) return;
        if (route && typeof route.beforeEnter === "function" && route.beforeEnter(to, from) === false) return;

        current = to;

        try {
            if (route && (route.html || typeof route.view === "function")) {
                if (route.html) {
                    // show loading
                    mountNodes(loading(to, from));
                    const url = (typeof route.html === "function") ? route.html(to) : route.html;
                    const fragment = await loadHtml(url, {
                        cache: route.cache !== false,
                        allowScripts: !!route.allowScripts,
                        fetchOptions: route.fetchOptions || {}
                    });
                    mountNodes(fragment);
                } else {
                    const out = route.view({ path: to.path, params: to.params, query: to.query });
                    mountNodes(out);
                }
            } else {
                const out = notFound();
                mountNodes(out);
            }
            if (afterEach) afterEach(to, from);
            el.dispatchEvent(new CustomEvent("routechange", { detail: to }));
        } catch (err) {
            mountNodes(onError(err, to));
        }
    };

    const navigate = (to, { replace = false } = {}) => {
        const dest = String(to || "/");
        if (mode === "hash") {
            const newHash = dest.startsWith("#") ? dest : ("#" + dest.replace(/^#/, ""));
            if (replace) location.replace(newHash);
            else location.hash = newHash;
        } else {
            const full = (base || "") + dest;
            if (replace) history.replaceState({}, "", full);
            else history.pushState({}, "", full);
            onChange();
        }
    };

    const onHash = () => onChange();
    const onPop = () => onChange();
    if (mode === "hash") window.addEventListener("hashchange", onHash);
    else window.addEventListener("popstate", onPop);

    // init (async-aware)
    onChange();

    Object.defineProperty(el, "navigate", { value: navigate });
    Object.defineProperty(el, "current", { get: () => current });
    Object.defineProperty(el, "destroy", {
        value: () => {
            if (mode === "hash") window.removeEventListener("hashchange", onHash);
            else window.removeEventListener("popstate", onPop);
        }
    });

    return el;
};
