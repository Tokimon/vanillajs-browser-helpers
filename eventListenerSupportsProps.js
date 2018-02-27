import isBoolean from 'vanillajs-helpers/isBoolean';

let supported;

export default function eventListenerSupportsProps() {
  if(!isBoolean(supported)) {
    try {
      const noop = () => {};

      const opts = Object.defineProperty({}, 'passive', {
        get() { supported = true; }
      });

      window.addEventListener('test', noop, opts);
      window.removeEventListener('test', noop, opts);
    } catch(err) {
      supported = false;
    }
  }

  return supported;
}
