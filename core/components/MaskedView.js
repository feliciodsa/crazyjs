import { Reactive } from "../index.js";
import { Custom } from "./Custom.js";

export const MaskedView = (key, {
    label = null,
    show = 'bullet',
    as = 'span',
    className,
    style,
    labelClass,
    labelStyle,
} = {}) => {
    const makeMask = (showOpt) => (value) => {
        const s = String(value ?? '');
        if (typeof showOpt === 'function') return showOpt(s);
        if (showOpt === 'none') return s;
        if (showOpt === 'bullet') return '•'.repeat(s.length);
        if (showOpt === 'last2') return s.length <= 2 ? '•'.repeat(s.length) : '•'.repeat(s.length - 2) + s.slice(-2);
        if (typeof showOpt === 'number' && showOpt >= 0) {
            const n = showOpt;
            return s.length <= n ? '•'.repeat(s.length) : '•'.repeat(s.length - n) + s.slice(-n);
        }
        return '•'.repeat(s.length);
    };

    const maskFn = makeMask(show);
    const masked = Reactive(key, Custom(as, [], { className, style }), { format: maskFn });

    return label
        ? Custom('div', [
            Custom('strong', [label], { className: labelClass, style: labelStyle }),
            masked
        ])
        : masked;
};