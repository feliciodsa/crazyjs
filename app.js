import { Render, Custom, Input, Button, Reactive, Link, Router } from "./core/index.js";


const Routes = Router({
    mode: "hash",
    routes: [
        { path: "/", html: "./pages/home.html", cache: true },
        { path: "/about", html: "./pages/about.html" },
        // dinâmico: tenta carregar ./pages/user-<id>.html
        { path: "/user/:id", html: ({ params }) => `./pages/user-${params.id}.html` },
    ],
    notFound: () => Custom("div", ["404 HTML — não achei a página. ", Link({ href: "#/", text: "Home" })]),
    loading: () => Custom("div", ["Carregando página HTML..."]),
    onError: (err) => Custom("div", [`Falha ao carregar: ${err.message}`])
})

Render(components, [
    Custom('nav', [
        Link({ href: '/', text: 'Home' }),
        Link({ href: '#/about', text: 'About' })
    ]),
    Routes
]);
