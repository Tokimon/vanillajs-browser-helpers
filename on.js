import words from 'vanillajs-helpers/eachWord';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isBoolean from 'vanillajs-helpers/isBoolean';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';



export const propsSupported = (() => {
  let supported = false;

  try {
    const noop = () => {};

    const opts = Object.defineProperty({}, 'passive', {
      get() { supported = true; }
    });

    window.addEventListener('test', noop, opts);
    window.removeEventListener('test', noop, opts);
  } catch(err) {
    supported = false;
  }

  return supported;
})();



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
  if(isString(elm)) {
    [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
  }

  if(isFunction(handler)) {
    if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }
    if(isArray(eventNames)) { eventNames = eventNames.join(); }

    if(!propsSupported) {
      options = isBoolean(options) ? options : !!options.capture;
    }

    words(eventNames, (name) => elm.addEventListener(name, handler, options), /[, ]+/);
  }

  return elm;
}
