import words from './eachWord';
import isArray from './isArray';
import isFunction from './isFunction';

/**
 * Bind event handler for one or more event names (seperated by space).
 * @param  {HTMLElement} elm - HTML Element to bind the event to
 * @param  {String} eventNames - Space seperated string of event names to bind the handler to
 * @param  {Function} handler - Handler to bind to the event(s)
 * @return {HTMLElement} - The 'elm' or NULL
 */
export default function on(elm, eventNames, handler) {
  if(!elm) { return null; }

  if(isFunction(elm.addEventListener) && isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(' '); }
    words(eventNames, (name) => elm.addEventListener(name, handler, false));
  }

  return elm;
}
