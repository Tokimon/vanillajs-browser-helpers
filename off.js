import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';

import isEventTarget from './isEventTarget';



const _off = (elm, evt, handler) => elm.removeEventListener(evt, handler, false);



/**
 * Removed an event handler from one or more event names on a DOM element.
 *
 * @function off
 * @param {HTMLElement} [elm=document] - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to remove the handler from
 * @param {Function} handler - Handler to unbind from the event
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function off(elm, eventNames, handler) {
  if (isArray(elm) || isString(elm)) {
    [elm, eventNames, handler] = [document, elm, eventNames];
  }

  if (!isEventTarget(elm)) { elm = document; }
  if (isString(eventNames)) { eventNames = [eventNames]; }

  if (isFunction(handler) && isArray(eventNames)) {
    eventNames.forEach((evt) => isString(evt) && _off(elm, evt, handler));
  }

  return elm;
}
