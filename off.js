import words from './eachWord';
import isArray from './isArray';
import isFunction from './isFunction';

/**
 * Unbinds events for the given element.
 * @param  {HTMLElement} elm - HTML Element to unbind the event from
 * @param  {String} eventNames - Space seperated string of event names to unbind the handler from
 * @param  {Function} handler - Handler to unbind from the event(s)
 * @return {HTMLElement} - The 'elm' or NULL
 */
export default function off(elm, eventNames, handler) {
  if(!elm) { return null; }

  if(isFunction(elm.removeEventListener) && isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(' '); }
    words(eventNames, (name) => elm.removeEventListener(name, handler, false));
  }

  return elm;
}
