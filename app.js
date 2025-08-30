import { Render, Custom, Link, Reactive, Input, Button, Image } from "./core/index.js";
import { Routes } from "./Routes.js";

const FieldEmail = Reactive('email', Input({
    type: 'email',
    required: true,
    placeholder: 'Email',
}))

const BtnSend = Button({
    type: 'submit',
    text: 'Enviar',
})


var Nav = Custom('nav', [
    Custom('div', [
        Custom('div', [
            Image({ src: '../assets/brasil.png', className: 'w-10 h-10 shadow-md' }),
            Link({ href: '/', text: 'Reax UI', className: 'font-semibold text-white' })
        ], {
            className: 'flex flex-row items-center font-bold flex flex-row gap-4'
        }),
        Custom('div', [
            Custom('span', ['v0.0.1 Alpha'], { className: 'font-light' })
        ], {
            className: 'flex flex-row items-center font-bold'
        }),
        Custom('div', [
            Link({ href: '/', text: 'Home', className: 'font-semibold text-white' }),
            Link({ href: '#/about', text: 'About', className: 'font-semibold text-white' })
        ], {
            className: 'flex flex-row items-center gap-4'
        })
    ], { className: 'w-8/12 mx-auto flex flex-row justify-between items-center' })

], {
    className: 'w-full flex flex-row justify-between items-center p-4 bg-blue-500 text-white'
})

Render(components, [
    Custom('div', [Nav]),
    Routes
]);
