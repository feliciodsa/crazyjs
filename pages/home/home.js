import { Button, Custom, Input, Reactive, Render } from "../../core/index.js";

const mount = document.querySelector('#home'); // escopo pela seção

const KEY = 'home.text'; // namespace pra não conflitar com outras páginas

const FieldEmail = Reactive(KEY, Input({
    type: 'text',
    placeholder: 'Type anything',
    required: true,
    className: 'w-full border-1 border-blue-500 p-2 rounded-md'
}));

const BtnPrint = Button({
    type: 'button',
    text: 'Print',
    className: 'bg-blue-400 text-white p-2 rounded-md cursor-pointer',
    callback: { click: () => console.log('value:', FieldEmail.value) }
});

const Box = Reactive(KEY, Custom('div', [], {
    className: 'h-10 bg-blue-100 text-blue-500 p-2 rounded-md'
}));

const view = Custom('div', [
    Custom('b', ['This field is Reactive:']),
    FieldEmail,
    'But this box is Reactive',
    Box,
    'But this button is not!',
    BtnPrint,
], { className: 'w-10/12 mx-auto mt-60 border-1 border-gray-300 p-4 rounded-md flex flex-col gap-4' });

// 👇 memória local (não usa `components`) e monta só no home-root
Render([], [view], { mount, clear: true });