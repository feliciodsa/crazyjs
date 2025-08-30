export const Render = (memoryComponents, elements, { mount = document.body, clear = false } = {}) => {
  if (!Array.isArray(elements)) return;
  if (clear) mount.innerHTML = '';

  const frag = document.createDocumentFragment();
  elements.forEach((element) => {
    if (!element) return;
    memoryComponents.push(element);
    frag.append(element);
  });
  mount.append(frag);
};
