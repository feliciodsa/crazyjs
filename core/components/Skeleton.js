import { Custom } from "./Custom.js";

export const Skeleton = () => Custom('div', [
  Custom('div', [], { className: 'sk sk-lg' }),
  Custom('div', [], { className: 'sk' }),
  Custom('div', [], { className: 'sk sk-sm' }),
]);
