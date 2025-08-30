import { ReaxUI, Link, Router, Skeleton } from "./core/index.js";

export const Routes = Router({
    mode: "hash",
    transition: { type: 'fade', duration: 220, easing: 'ease' },
    loadingDelay: 120,
    minLoadingTime: 180,
    prefetchOnHover: true,
    routes: [
        { path: "/", html: "./pages/home.html", cache: true },
        { path: "/about", html: "./pages/about.html", cache: true },
        { path: "/user/:id", html: ({ params }) => `./pages/user-${params.id}.html`, cache: true },
    ],
    notFound: () => ReaxUI("div", ["404 HTML — não achei a página. ", Link({ href: "#/", text: "Home" })]),
    loading: () => ReaxUI("div", ["Carregando página HTML..."]),
    onError: (err) => ReaxUI("div", [`Falha ao carregar: ${err.message}`]),
    loading: () => Skeleton(),
})