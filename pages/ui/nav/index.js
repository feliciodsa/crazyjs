import { Element, Image, Link } from "../../../core/index.js";

export const Nav = Element('nav', [
    Element('div', [
        Element('div', [
            Image({ src: '../assets/brasil.png', className: 'w-10 h-10 shadow-md' }),
            Link({ href: '/', text: 'Reax UI', className: 'font-semibold text-white' })
        ], {
            className: 'flex flex-row items-center font-bold flex flex-row gap-4'
        }),
        Element('div', [
            Element('span', ['v0.0.1 Alpha'], { className: 'font-light' })
        ], {
            className: 'flex flex-row items-center font-bold'
        }),
        Element('div', [
            Link({ href: '/', text: 'Home', className: 'font-semibold text-white' }),
            Link({ href: '#/about', text: 'About', className: 'font-semibold text-white' })
        ], {
            className: 'flex flex-row items-center gap-4'
        })
    ], { className: 'w-10/12 mx-auto flex flex-row justify-between items-center' })

], {
    className: 'w-full flex flex-row justify-between items-center p-4 bg-blue-500 text-white'
})
