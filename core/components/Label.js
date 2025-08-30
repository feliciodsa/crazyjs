import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Label = ({
  id,
  forId,
  text,
  className,
  style,
} = {}) => {
  const element = document.createElement('label');
  if (id) element.id = id;
  if (forId) element.htmlFor = forId;
  if (text != null) element.textContent = String(text);

  ApplyStyleOrClassList(element, className, style);

  return element;
};
