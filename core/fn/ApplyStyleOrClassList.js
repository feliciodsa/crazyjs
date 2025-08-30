export const ApplyStyleOrClassList = (el, className, style) => {
  if (!el) return;

  if (className) {
    const classes = Array.isArray(className)
      ? className
      : String(className).split(/\s+/);
    classes.filter(Boolean).forEach(c => el.classList.add(c));
  }

  if (!style) return;

  if (typeof style === 'string') {
    // Keep compatibility, but avoid overwriting the StyleDeclaration object directly
    el.setAttribute('style', style);
    return;
  }

  if (typeof style === 'object') {
    Object.entries(style).forEach(([k, v]) => {
      const prop = k.includes('-') ? k : k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      el.style.setProperty(prop, v);
    });
  }
};
