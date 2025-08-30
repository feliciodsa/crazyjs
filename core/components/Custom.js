import { AddComponentInMemory } from "../fn/AddComponentInMemory.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Custom = (tag = 'div', childrens = [], {
  id,
  className,
  style
} = {}) => {
  const element = document.createElement(tag);
  if (id) element.id = id;

  ApplyStyleOrClassList(element, className, style);
  AddComponentInMemory(window.components, element, childrens);

  return element;
};
