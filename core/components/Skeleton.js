import { Element } from "./Element.js";

export const Skeleton = () => Element('div', [
  Element('div', [], { className: 'sk sk-lg' }),
  Element('div', [], { className: 'sk' }),
  Element('div', [], { className: 'sk sk-sm' }),
]);
