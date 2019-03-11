import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isBoolean from 'vanillajs-helpers/isBoolean';

import isEventTarget from './isEventTarget';
import eventOptionsSupported from './eventOptionsSupported';



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

  if (!isEventTarget(elm)) {
    elm = document;
  }

  const evtIsString = isString(eventNames);

  if (!isFunction(handler) || !(isArray(eventNames) || evtIsString)) {
    return elm;
  }

  if (!eventOptionsSupported()) {
    options = isBoolean(options) ? options : !!options.capture;
  }

  if (evtIsString) {
    elm.addEventListener(eventNames, handler, options);
  } else {
    eventNames.forEach((evt) => {
      if (isString(evt)) {
        elm.addEventListener(evt, handler, options);
      }
    });
  }

  return elm;
}
