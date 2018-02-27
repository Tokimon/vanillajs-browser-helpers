import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';

import eventListenerSupportsProps from './eventListenerSupportsProps';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';



/**
 * Bind an event handler for one or more event names on a DOM element.
 * @function on
 * @param {HTMLElement} [elm=document] - DOM element to bind the event to
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {Function} handler - Handler to bind to the event
 * @param {Object} options - Options to pass to the 'addEventListener'
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function on(elm, eventNames, handler, options) {
  if(isString(elm)) { [elm, eventNames, handler, options] = [document, elm, eventNames, handler]; }

  if(isFunction(handler)) {
    if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }
    if(isArray(eventNames)) { eventNames = eventNames.join(); }

    const capture = !!options || (!eventListenerSupportsProps() ? !!options.capture : options);

    words(eventNames, (name) => elm.addEventListener(name, handler, capture), /[, ]+/);
  }

  return elm;
}
