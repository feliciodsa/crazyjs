export const ApplyStyleOrClassList = (obj, className, style) => {
    if (className) obj.classList.add(className)
    if (style) obj.style = style
}