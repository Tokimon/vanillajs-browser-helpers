import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';

/**
 * Removed an event handler from one or more event names on a DOM element.
 * @function off
 * @param {HTMLElement} [elm=document] - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to remove the handler from
 * @param {Function} handler - Handler to unbind from the event
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function off(elm, eventNames, handler) {
  if(isString(elm)) { [elm, eventNames, handler] = [document, elm, eventNames]; }
  if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }

  if(isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(); }
    words(eventNames, (name) => elm.removeEventListener(name, handler, false), /[, ]+/);
  }

  return elm;
}
