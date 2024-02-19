import { ApplyCallbackFn } from "../fn/ApplyCallbackFn.js";
import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Input = ({
    id,
    type,
    text,
    placeholder,
    className,
    style,
    required,
    callback,
} = attrs) => {
    const element = document.createElement('input')

    element.id = id
    element.placeholder = placeholder
    element.type = type || 'text'
    element.required = required;

    if (element.type == 'button') {
        element.value = text
    }

    element.onchange = (e) => {
        if (element.type == 'text' || element.type == 'password') {
            element.value = e.target.value;
        }
    }

    ApplyStyleOrClassList(element, className, style);
    ApplyCallbackFn(element, callback)

    return element;
}