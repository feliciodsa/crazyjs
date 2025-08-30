import { AddComponentInMemory } from "../fn/AddComponentInMemory.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Between = ({
  id,
  className = 'twice',
  style,
  childrens = []
} = {}) => {
  const element = document.createElement('div');
  if (id) element.id = id;

  ApplyStyleOrClassList(element, className, style);
  AddComponentInMemory(window.components, element, childrens);

  return element;
};
