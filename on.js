import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isObject from 'vanillajs-helpers/isObject';

import isEventTarget from './isEventTarget';
import eventOptionsSupported from './eventOptionsSupported';



const _on = (elm, evt, handler, options) => elm.addEventListener(evt, handler, options);



/**
 * Bind an event handler for one or more event names on a DOM element.
 *
 * @function on
 * @param {HTMLElement} [elm=document] - DOM element to bind the event to
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {Function} handler - Handler to bind to the event
 * @param {Object} options - Options to pass to the 'addEventListener'
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function on(elm, eventNames, handler, options) {
  if (isArray(elm) || isString(elm)) {
    [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
  }

  if (!isEventTarget(elm)) { elm = document; }
  if (!isFunction(handler)) { return elm; }

  if (!eventOptionsSupported()) {
    options = isObject(options) && !!options.capture;
  }

  if (isString(eventNames)) {
    _on(elm, eventNames, handler, options);
  } else if (isArray(eventNames)) {
    eventNames.forEach((evt) => on(elm, evt, handler, options));
  }

  return elm;
}
