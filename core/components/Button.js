import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Button = ({
    id,
    type,
    text,
    className,
    style,
    callback
} = attrs) => {
    const element = document.createElement('button')

    element.id = id
    element.type = type || 'button'
    element.textContent = text

    ApplyStyleOrClassList(element, className, style);
    ApplyCallbackFn(element, callback)

    return element;
}