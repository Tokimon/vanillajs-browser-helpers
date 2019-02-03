/**
 * Is the given object a viable event target (implements the addEventListener function)
 * @function isEventTarget
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it an EventTarget or not
 */
export default function isEventTarget(obj) {
  return obj instanceof EventTarget;
}
