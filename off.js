import eachWord from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';



/**
 * Removed an event handler from one or more event names on a DOM element.
 * @function off
 * @param {HTMLElement} [elm=document] - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to remove the handler from
 * @param {Function} handler - Handler to unbind from the event
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function off(elm, eventNames, handler) {
  if(isString(elm) || isArray(elm)) {
    [elm, eventNames, handler] = [document, elm, eventNames];
  }
  if(!elm || !elm.addEventListener) { elm = document; }

  if(isFunction(handler) && (isString(eventNames) || isArray(eventNames))) {
    if(isArray(eventNames)) { eventNames = eventNames.join(); }
    eachWord(eventNames, (name) => elm.removeEventListener(name, handler, false), /[, ]+/);
  }

  return elm;
}
