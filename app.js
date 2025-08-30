import { Render, Custom, Link } from "./core/index.js";
import { Routes } from "./Routes.js";

var Nav = Custom('nav', [
    Custom('div', [
        'Reax UI'
    ], {
        className: 'flex flex-row items-center font-bold'
    }),
    Custom('div', [
        Link({ href: '/', text: 'Home', className: 'font-semibold text-white' }),
        Link({ href: '#/about', text: 'About', className: 'font-semibold text-white' })
    ], {
        className: 'flex flex-row items-center gap-4'
    })
], {
    className: 'w-full flex flex-row justify-between items-center p-4 bg-blue-500 text-white'
})

Render(components, [
    Custom('div', [Nav]),
    Routes
]);
