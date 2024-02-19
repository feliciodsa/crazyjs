import { AddComponentInMemory } from "../fn/AddComponentInMemory.js"

export const Between = (childrens, {
    id,
    className,
    style
} = attrs) => {
    const element = document.createElement('div')

    if (id) {
        element.id = id
    }

    if (className) element.classList = className
    else if (style) element.style = style
    else element.classList = 'twice'

    AddComponentInMemory(window.components, element, childrens)

    return element;
}