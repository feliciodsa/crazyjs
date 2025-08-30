import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";
import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";

export const Link = ({
  id,
  href = '#',
  text,
  target,
  download,
  className,
  style,
  ariaLabel,
  callback
} = {}) => {
  const element = document.createElement('a');

  if (id) element.id = id;
  element.href = href;
  if (text != null) element.textContent = String(text);
  if (ariaLabel) element.setAttribute('aria-label', ariaLabel);

  if (target) {
    element.target = target;
    if (target === '_blank') element.rel = 'noopener noreferrer';
  }

  if (download) element.setAttribute('download', download);

  ApplyStyleOrClassList(element, className, style);
  ApplyCallbackFn(element, callback);

  return element;
};
