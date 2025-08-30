export const ApplyCallbackFn = (el, callback) => {
  if (!el || !callback) return;

  // Backward compatibility: { type: 'onclick'|'onchange'|'onblur', fn }
  if (callback.type && callback.fn) {
    const type = callback.type.replace(/^on/, '');
    el.addEventListener(type, callback.fn);
    return;
  }

  // New: map of events { click: fn, change: fn, blur: fn, ... }
  if (typeof callback === 'object' && !callback.fn) {
    Object.entries(callback).forEach(([evt, fn]) => {
      if (typeof fn === 'function') {
        const type = evt.replace(/^on/, '');
        el.addEventListener(type, fn);
      }
    });
  }
};
