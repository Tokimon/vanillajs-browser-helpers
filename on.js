import eachWord from 'vanillajs-helpers/eachWord';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isBoolean from 'vanillajs-helpers/isBoolean';

import eventOptionsSupported from './eventOptionsSupported';



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
  if(isString(elm) || isArray(elm)) {
    [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
  }

  if(!elm || !elm.addEventListener) { elm = document; }

  if(isFunction(handler) && (isString(eventNames) || isArray(eventNames))) {
    if(isArray(eventNames)) { eventNames = eventNames.join(); }

    if(!eventOptionsSupported()) {
      options = isBoolean(options) ? options : !!options.capture;
    }

    eachWord(eventNames, (name) => elm.addEventListener(name, handler, options), /[, ]+/);
  }

  return elm;
}
