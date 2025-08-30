import { Render, Custom, Router } from "./core/index.js";
import { Nav } from "./pages/ui/nav/index.js";
import { Footer } from "./pages/ui/footer/index.js"; // se tiver

const router = Router({
    mode: "hash",
    routes: [
        { path: "/", html: "./pages/home/home.html", allowScripts: true, cache: false },
        { path: "/about", html: "./pages/about/about.html", allowScripts: true }
    ]
});

const AppLayout = Custom('div', [
    Custom('header', [Nav]),                   // fica sempre
    Custom('main', [router], { id: 'main' }),  // Router trocando só aqui
    Custom('footer', [Footer ? Footer : ''])   // opcional
]);

Render(components, [AppLayout], { clear: true });
