import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';

/**
 * Bind an event handler for one or more event names on a DOM element.
 * @param  {HTMLElement} [elm=document] - DOM element to bind the event to
 * @param  {String|Array<String>} eventNames - Event names to bind the handler to
 * @param  {Function} handler - Handler to bind to the event
 * @return {HTMLElement} - The 'elm' (or document)
 */
export default function on(elm, eventNames, handler) {
  if(isString(elm)) { [elm, eventNames, handler] = [document, elm, eventNames]; }
  if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }

  if(isFunction(handler)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(); }
    words(eventNames, (name) => elm.addEventListener(name, handler, false), /[, ]+/);
  }

  return elm;
}
