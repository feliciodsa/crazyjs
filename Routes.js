import { Element, Link, Router, Skeleton } from "./core/index.js";

export const Routes = Router({
    mode: "hash",
    transition: { type: 'fade', duration: 220, easing: 'ease' },
    loadingDelay: 120,
    minLoadingTime: 180,
    prefetchOnHover: true,
    routes: [
        { path: "/", html: "./pages/home/home.html", allowScripts: true, cache: false },
        { path: "/about", html: "./pages/about.html", allowScripts: true, cache: false },
        { path: "/user/:id", html: ({ params }) => `./pages/user-${params.id}.html`, cache: false },
    ],
    notFound: () => Element("div", ["404 HTML — não achei a página. ", Link({ href: "#/", text: "Home" })]),
    loading: () => Element("div", ["Carregando página HTML..."]),
    onError: (err) => Element("div", [`Falha ao carregar: ${err.message}`]),
    loading: () => Skeleton(),
})