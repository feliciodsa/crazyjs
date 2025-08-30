import { ReaxUI } from "./ReaxUI.js";

export const Skeleton = () => ReaxUI('div', [
  ReaxUI('div', [], { className: 'sk sk-lg' }),
  ReaxUI('div', [], { className: 'sk' }),
  ReaxUI('div', [], { className: 'sk sk-sm' }),
]);

// CSS do skeleton (pulso)
const style = document.createElement('style');
style.textContent = `
  .sk{height:14px;background:#eee;margin:8px 0;border-radius:6px;animation:pulse 1s ease-in-out infinite alternate;width:80%}
  .sk-lg{height:18px;width:40%}
  .sk-sm{width:60%}
  @keyframes pulse{from{opacity:.5}to{opacity:1}}
`;
document.head.appendChild(style);