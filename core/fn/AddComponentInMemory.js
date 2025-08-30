export const AddComponentInMemory = (memoryComponents, component, childrens) => {
  const items = Array.isArray(childrens) ? childrens : (childrens ? [childrens] : []);
  const frag = document.createDocumentFragment();
  const suppress = (window.crazy && window.crazy._suppressMemoryPush) ? true : false;

  items.forEach((element) => {
    const node = (typeof element === 'string') ? document.createTextNode(element) : element;
    if (node) {
      if (!suppress) memoryComponents.push(node);
      frag.append(node);
    }
  });

  component.append(frag);
};
