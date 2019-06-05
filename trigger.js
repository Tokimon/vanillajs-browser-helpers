import isArray from 'vanillajs-helpers/isArray';
import isString from 'vanillajs-helpers/isString';

import isEventTarget from './isEventTarget';



const customEvent = (name, data) => {
  const options = { bubbles: true };
  if (typeof data !== 'undefined') { options.detail = data; }
  return new CustomEvent(name, options);
};



/**
 * Trigger one or more events on a DOM element.
 *
 * @function trigger
 * @param {HTMLElement} [elm=document] - DOM element to trigger the event on
 * @param {String|String[]} eventNames - Event names to trigger
 * @param {Object} [data] - Extra data to add to the triggered event
 * @return {HTMLElement} The 'elm' (or document)
 */
export default function trigger(elm, eventNames, data) {
  if (isArray(elm) || isString(elm)) {
    [elm, eventNames, data] = [document, elm, eventNames];
  }

  if (!isEventTarget(elm)) { elm = document; }

  const cb = (evt) => isString(evt) && elm.dispatchEvent(customEvent(evt, data));

  if (isString(eventNames)) {
    cb(eventNames);
  } else if (isArray(eventNames)) {
    eventNames.forEach(cb);
  }

  return elm;
}
