/**
 * Is the given object a viable event target (implements the addEventListener function)
 *
 * @param obj - The object to check
 * @return Is it an Event Target or not
 */
export default (obj: unknown): obj is EventTarget =>
  !!obj
  && typeof (obj as EventTarget).addEventListener === 'function'
  && typeof (obj as EventTarget).removeEventListener === 'function'
  && typeof (obj as EventTarget).dispatchEvent === 'function';
