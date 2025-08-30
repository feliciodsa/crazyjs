import { Render, Custom, Input, Button, Reactive } from "./core/index.js";

const Title = Custom('div', ['Login'], {
  style: `width: 100%; text-align: center; font-weight: bold;`
});

const Divider = Custom('hr', [], {
  style: `width: 100%; border: 1px solid #e4e4e4;`
});

// Input reativo por chave "password"
const PasswordField = Reactive("password", Input({
  id: 'password',
  type: 'password',
  placeholder: 'Digite sua senha',
  className: 'form-element',
  required: true
}));

// Visualização mascarada usando Reactive em um span (sem precisar acessar sinal global)
const MaskedView = (() => {
  const span = Reactive('password', Custom('span'), {
    format: v => v ? '•'.repeat(String(v).length) : ''
  });
  return Custom('div', [ Custom('strong', ['Senha atual: ']), span ]);
})();

const ClearBtn = Button({
  text: 'Limpar',
  className: 'form-button',
  callback: { click: () => PasswordField.set('') }
});

const ShowBtn = Button({
  text: 'Mostrar (console)',
  className: 'form-button',
  callback: { click: () => console.log('Senha atual:', PasswordField.get()) }
});

Render(components, [
  Title,
  Divider,
  Custom('div', [PasswordField], { className: 'form-element' }),
  Custom('br'),
  MaskedView,
  Custom('br'),
  Custom('div', [ClearBtn, ShowBtn], { className: 'twice' }),
]);
