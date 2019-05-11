let supported;



/**
 * Detect if options are supported by the add-/removeEventListener methods
 * @function eventOptionsSupported
 * @param {Boolean} noCache - Bypasses previously cached result
 * @return {Boolean} Are event binding options supported or not
 */
export default function eventOptionsSupported(noCache) {
  if (typeof supported !== 'undefined' && noCache !== true) {
    return supported;
  }

  supported = false;

  try {
    const noop = () => {};
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return supported;
      }
    });

    window.addEventListener('test', noop, opts);
  } catch (err) {
    supported = false;
  }

  return supported;
}
