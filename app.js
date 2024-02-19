import { Render, Custom, Form, Input, Between, Link, Button } from "./core/index.js";

Render(components, [
    Custom('div', ['Login'], {
        style: `
        width: 100%; 
        text-align: center; 
        font-weight: bold;`
    }),
    Custom('hr', [], {
        style: `
        width: 100%; 
        border: 1px solid #e4e4e4;`
    }, {}),
    //BEGIN Form
    Form('login', [
        Input({
            id: 'email',
            placeholder: 'Digite seu melhor e-mail',
            className: 'form-element',
            required: true
        }),
        Input({
            id: 'password',
            type: 'password',
            placeholder: 'Digite sua senha',
            className: 'form-element',
            required: true
        }),
        Between([
            Link('Esqueci minha senha', [], {
                href: 'teste.html',
            }),
            Button({
                id: 'enviar',
                type: 'submit',
                text: 'Enviar',
                placeholder: 'Digite sua senha',
                className: 'form-button',
                callback: {
                    type: 'onclick',
                    fn: (e) => {

                        if (e.target.type !== 'submit') {
                            e.preventDefault();
                        }

                        const email = window.components.filter((component) => component.id == 'email')[0];
                        const password = window.components.filter((component) => component.id == 'password')[0];


                        console.log(email.value);
                        console.log(password.value);
                    }
                }
            })
        ], {}),
        Custom('hr', [], {
            style: 'width: 100%; border: 1px solid #e4e4e4'
        }, {}),
        Between([
            Custom('b', ['Não possui conta?'], {}),
            Link('Cadastre-se', [], {
                href: 'teste.html',
                style: `
                    font-weight: bold`
            }),
        ], {}),
    ], {})//END Form
])