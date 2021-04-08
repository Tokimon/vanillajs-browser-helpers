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
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return supported;
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.addEventListener('test', () => {}, opts);
  } catch {
    supported = false;
  }

  return supported;
}
