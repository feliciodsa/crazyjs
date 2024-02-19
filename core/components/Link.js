import { AddComponentInMemory } from "../fn/AddComponentInMemory.js"
import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";

export const Link = (name, childrens, {
    href,
    className,
    style,
    callback
} = attrs) => {
    const element = document.createElement('a')

    element.id = name
    element.textContent = name;
    element.href = href

    if (className) element.classList = className
    if (style) element.style = style

    AddComponentInMemory(window.components, element, childrens)
    ApplyCallbackFn(element, callback)

    return element;
}