import { ApplyStyleOrClassList } from "../fn/ApplyStyleOrClassList.js";

export const Image = ({
    id,
    src,
    className,
    style,
} = {}) => {
    const element = document.createElement('img');
    if (id) element.id = id;
    if (src) element.src = String(src);

    ApplyStyleOrClassList(element, className, style);

    return element;
};
