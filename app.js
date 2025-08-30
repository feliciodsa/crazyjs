import { Render, ReaxUI, Link } from "./core/index.js";
import { Routes } from "./Routes.js";

var Nav = ReaxUI('nav', [
    ReaxUI('div', [
        'Reax UI'
    ], {
        className: 'flex flex-row items-center font-bold'
    }),
    ReaxUI('div', [
        Link({ href: '/', text: 'Home', className: 'font-semibold text-white' }),
        Link({ href: '#/about', text: 'About', className: 'font-semibold text-white' })
    ], {
        className: 'flex flex-row items-center gap-4'
    })
], {
    className: 'w-full flex flex-row justify-between items-center p-4 bg-blue-500 text-white'
})

Render(components, [
    ReaxUI('div', [
        Nav
    ]),
    Routes
]);
