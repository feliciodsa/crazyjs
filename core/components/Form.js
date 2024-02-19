import { AddComponentInMemory } from "../fn/AddComponentInMemory.js"

export const Form = (name, childrens, {
    className,
    style
} = attrs) => {
    const element = document.createElement('form')
    element.id = name

    if (className) element.classList = className
    if (style) element.style = style

    AddComponentInMemory(window.components, element, childrens)

    return element;
}