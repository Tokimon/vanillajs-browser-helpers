export const eventTargetCheck = (useEventTarget) => {
  return useEventTarget
    ? (obj) => obj instanceof EventTarget
    : (obj) => !!obj && typeof obj.addEventListener === 'function';
};

/**
 * Is the given object a viable event target (implements the addEventListener function)
 * @function isEventTarget
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it an Event Target or not
 */
export default eventTargetCheck(!!window.EventTarget);
