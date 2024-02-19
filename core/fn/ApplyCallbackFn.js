export const ApplyCallbackFn = (component, callback) => {
    if (callback && callback.type == 'onblur') component.onblur = callback.fn
    if (callback && callback.type == 'onclick') component.onclick = callback.fn
    if (callback && callback.type == 'onchange') component.onchange = callback.fn
}