import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Button = ({
  id,
  type = 'button',
  text,
  className,
  style,
  disabled = false,
  ariaLabel,
  callback
} = {}) => {
  const element = document.createElement('button');

  if (id) element.id = id;
  element.type = type;
  if (text != null) element.textContent = String(text);
  if (ariaLabel) element.setAttribute('aria-label', ariaLabel);
  if (disabled) element.disabled = true;

  ApplyStyleOrClassList(element, className, style);
  ApplyCallbackFn(element, callback);

  return element;
};
