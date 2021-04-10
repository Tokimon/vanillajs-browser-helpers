let supported: boolean;



/**
 * Detect if options are supported by the add-/removeEventListener methods
 * 
 * @param recheck - Force the function to check the support again
 * @return Are event binding options supported or not
 */
export default function eventOptionsSupported(recheck?: boolean): boolean {
  if (typeof supported !== 'undefined' && recheck !== true) {
    return supported;
  }

  try {
    const noop = () => {};
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return supported;
      }
    });

    window.addEventListener('test', noop, opts);
  } catch {
    supported = false;
  }

  return supported;
}
