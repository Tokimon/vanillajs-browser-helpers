import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';

/**
 * Removed an event handler from one or more event names on a DOM element.
 * @param  {HTMLElement} elm - DOM Element to unbind the event from
 * @param  {String|Array<String>} eventNames - Event names to remove the handler from
 * @param  {Function} handler - Handler to unbind from the event
 * @return {HTMLElement|NULL} - The 'elm' or NULL
 */
export default function off(elm, eventNames, handler) {
  if(!elm) { return null; }

  if(isFunction(elm.removeEventListener) && isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(' '); }
    words(eventNames, (name) => elm.removeEventListener(name, handler, false));
  }

  return elm;
}
