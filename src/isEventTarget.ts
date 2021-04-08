const isEventTarget = typeof EventTarget !== 'undefined'
  ? (obj: unknown): obj is EventTarget => obj instanceof EventTarget
  : (obj: unknown): obj is EventTarget => !!obj && typeof obj.addEventListener === 'function';

/**
 * Is the given object a viable event target (implements the addEventListener function)
 *
 * @param obj - The object to check
 * @return Is it an Event Target or not
 */
export default isEventTarget;
