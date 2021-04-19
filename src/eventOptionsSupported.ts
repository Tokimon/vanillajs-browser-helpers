let supported: boolean;



/**
 * Detect if options are supported by the add-/removeEventListener methods
 *
 * @param recheck - Force the function to check the support again
 * @return Are event binding options supported or not
 */
export default function eventOptionsSupported(recheck?: boolean): boolean {
  if (supported != null && !recheck) {
    return supported;
  }

  supported = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true;
        return supported;
      }
    });

    const noop = () => undefined;
    document.addEventListener('verify-support', noop, opts);
    document.removeEventListener('verify-support', noop, opts);
  } catch {}

  return supported;
}
