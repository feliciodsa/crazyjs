import { AddComponentInMemory } from "../fn/AddComponentInMemory.js"

export const Custom = (tag, childrens, {
    id,
    className,
    style
} = attrs) => {
    const element = document.createElement(tag)

    if (id) {
        element.id = id
    }

    if (className) element.classList = className
    if (style) element.style = style

    AddComponentInMemory(window.components, element, childrens)

    return element;
}