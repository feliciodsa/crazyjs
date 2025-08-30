import { AddComponentInMemory } from "../fn/AddComponentInMemory.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";
import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";

export const Form = ({
  id,
  className,
  style,
  childrens = [],
  noValidate = true,
  onSubmit,
  callback
} = {}) => {
  const element = document.createElement('form');
  if (id) element.id = id;
  if (noValidate) element.setAttribute('novalidate', '');

  AddComponentInMemory(window.components, element, childrens);
  ApplyStyleOrClassList(element, className, style);

  const submitHandler = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') onSubmit(e);
  };
  element.addEventListener('submit', submitHandler);

  ApplyCallbackFn(element, callback);

  return element;
};
