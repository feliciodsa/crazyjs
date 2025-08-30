import { Render, Custom, Input, Button, Reactive, MaskedView } from "./core/index.js";

const Title = Custom('div', ['Login'], {
    style: 'width: 100%,background-color: #000000'
});

const FieldEmail = Reactive(
    'email',
    Input({
        type: 'text',
        required: true,
        placeholder: 'E-mail'
    })
)

const FieldPassword = Reactive(
    'password',
    Input({
        type: 'password',
        required: true,
        placeholder: 'Senha'
    })
)

const BtnSend = Button({
    type: 'submit',
    text: 'Login',
    style: 'width: 100%',
    callback: {
        click: () => {
            console.log(FieldEmail.value)
            console.log(FieldPassword.value)
        }
    }
})

const PassMaskedDefault = MaskedView('password', { label: 'Senha (•):' });
const PassMaskedLast2 = MaskedView('password', { label: 'Senha (2 últimos):', show: 'last2' });

Render(components, [
    Title,
    FieldEmail,
    FieldPassword,
    BtnSend,
    PassMaskedDefault,
    PassMaskedLast2
]);
