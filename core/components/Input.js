import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Input = ({
  id,
  type = 'text',
  name,
  value,
  placeholder,
  className,
  style,
  required = false,
  ariaLabel,
  callback,
} = {}) => {
  const element = document.createElement('input');

  element.type = type;
  if (id) element.id = id;
  if (name) element.name = name;
  if (value != null) element.value = value;
  if (placeholder) element.placeholder = placeholder;
  if (required) element.required = true;
  if (ariaLabel) element.setAttribute('aria-label', ariaLabel);

  element.addEventListener('input', (e) => {
    if (['text','password','search','email','url','tel','number'].includes(type)) {
      element.value = e.target.value;
    }
  });

  ApplyStyleOrClassList(element, className, style);
  ApplyCallbackFn(element, callback);

  return element;
};
