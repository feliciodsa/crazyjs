import { Render, Element, Router } from "./core/index.js";
import { Nav } from "./pages/ui/nav/index.js";
import { Footer } from "./pages/ui/footer/index.js"; // se tiver

const router = Router({
    mode: "hash",
    routes: [
        { path: "/", html: "./pages/home/home.html", allowScripts: true, cache: false },
        { path: "/about", html: "./pages/about/about.html", allowScripts: true }
    ]
});

const AppLayout = Element('div', [
    Element('header', [Nav]),                   // fica sempre
    Element('main', [router], { id: 'main' }),  // Router trocando só aqui
    Element('footer', [Footer ? Footer : ''])   // opcional
]);

Render(components, [AppLayout], { clear: true });
