import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';

/**
 * Bind an event handler for one or more event names on a DOM element.
 * @param  {HTMLElement} elm - DOM Element to bind the event to
 * @param  {String|Array<String>} eventNames - Space seperated string of event names to bind the handler to
 * @param  {Function} handler - Handler to bind to the event
 * @return {HTMLElement|NULL} - The 'elm' or NULL
 */
export default function on(elm, eventNames, handler) {
  if(!elm) { return null; }

  if(isFunction(elm.addEventListener) && isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(' '); }
    words(eventNames, (name) => elm.addEventListener(name, handler, false));
  }

  return elm;
}
