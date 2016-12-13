import words from 'vanillajs-helpers/eachWord';
import isFunction from 'vanillajs-helpers/isFunction';
import isArray from 'vanillajs-helpers/isArray';
import isString from 'vanillajs-helpers/isString';

import isDOMNode from './isDOMNode';

// Determine the method to create the correct CustomEvent object
// (IE 11 and below doesn't implement the object correctly)
const customEvent = isFunction(CustomEvent)
  ? (name, data) => {
    const options = { bubbles: true };
    if(typeof data !== 'undefined') { options.detail = data; }
    return new CustomEvent(name, options);
  }
  : (name, data = null) => {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, true, true, data);
    return evt;
  };



/**
 * Trigger one or more events on a DOM element.
 * @param  {HTMLElement} elm - DOM element to trigger the event on
 * @param  {String|Array<String>} eventNames - Event names to trigger
 * @param  {Object} [data] - Extra data to add to the triggered event
 * @return {HTMLElement|NULL} - The 'elm' or NULL
 */
export default function trigger(elm, eventNames, data) {
  if(isString(elm)) { [elm, eventNames, data] = [document, elm, eventNames]; }
  if(!isDOMNode(elm)) { elm = document; }

  if(isFunction(elm.dispatchEvent)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(); }
    words(eventNames, (name) => elm.dispatchEvent(customEvent(name, data)), /[, ]/);
  }

  return elm;
}
