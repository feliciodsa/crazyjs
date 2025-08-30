import { ApplyCallbackFn } from "./ApplyCallbackFn.js";
import { ApplyStyleOrClassList } from "./ApplyStyleOrClassList.js";
import { Render } from "./Render.js";
import { AddComponentInMemory } from "./AddComponentInMemory.js";

const __signals = new Map();
const createSignal = (initial) => {
  let value = initial;
  const subs = new Set();
  return {
    get() { return value; },
    set(next) {
      value = (typeof next === 'function') ? next(value) : next;
      subs.forEach(fn => { try { fn(value); } catch (e) { } });
    },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
  };
};
const getKeyed = (key, initial = undefined) => {
  if (!__signals.has(key)) __signals.set(key, createSignal(initial));
  return __signals.get(key);
};


const Reactive = (key, element, options = {}) => {
  if (typeof key === 'function') {
    const Component = key;
    return (props = {}) => Component(props);
  }
  if (typeof key !== 'string' || !element) return element;

  const sig = getKeyed(key);
  const { parse, format } = options;
  const tag = (element.tagName || '').toUpperCase();
  const isInput = (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');

  const reader = () => {
    let v;
    if (isInput) {
      const t = element.type;
      if (t === 'checkbox') v = !!element.checked;
      else if (t === 'radio') v = element.value;
      else v = element.value;
    } else {
      v = element.textContent;
    }
    return (typeof parse === 'function') ? parse(v) : v;
  };
  const writer = (v) => {
    const val = (typeof format === 'function') ? format(v) : v;
    if (isInput) {
      const t = element.type;
      if (t === 'checkbox') { element.checked = !!val; return; }
      if (t === 'radio') { element.checked = (element.value === val); return; }
      element.value = (val ?? '');
    } else {
      element.textContent = (val ?? '');
    }
  };

  // seed
  const curr = reader();
  if (typeof sig.get() === 'undefined') sig.set(curr);
  writer(sig.get());

  // signal -> element
  const unsub = sig.subscribe((v) => {
    if (isInput) {
      const t = element.type;
      const current = (t === 'checkbox') ? !!element.checked : (t === 'radio' ? element.value : element.value);
      if (current !== v) writer(v);
    } else {
      if (element.textContent !== String(v ?? '')) writer(v);
    }
  });

  // element -> signal
  const onChange = () => sig.set(reader());
  if (isInput) {
    element.addEventListener('input', onChange);
    element.addEventListener('change', onChange);
  }

  Object.defineProperty(element, "get", { value: () => sig.get(), enumerable: false });
  Object.defineProperty(element, "set", { value: (v) => sig.set(v), enumerable: false });
  Object.defineProperty(element, "watch", { value: (fn) => sig.subscribe(fn), enumerable: false });
  Object.defineProperty(element, "unbind", {
    value: () => {
      try { unsub && unsub(); } catch (e) { }
      if (isInput) {
        element.removeEventListener('input', onChange);
        element.removeEventListener('change', onChange);
      }
    }, enumerable: false
  });

  return element;
};

export { ApplyCallbackFn, ApplyStyleOrClassList, AddComponentInMemory, Render, Reactive };
