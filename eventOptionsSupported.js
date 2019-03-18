let supported;

export default function propsSupported() {
  if(typeof supported !== 'undefined') {
    return supported;
  }

  try {
    supported = false;
    const noop = () => {};
    const opts = Object.defineProperty({}, 'passive', {
      get() { supported = true; }
    });

    window.addEventListener('test', noop, opts);
    window.removeEventListener('test', noop, opts);
  } catch(err) {
    supported = false;
  }

  return supported;
}
