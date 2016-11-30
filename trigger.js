import words from 'vanillajs-helpers/eachWord';
import isFunction from 'vanillajs-helpers/isFunction';
import isArray from 'vanillajs-helpers/isArray';

// Determine the method to create the correct CustomEvent object
// (IE 11 and below doesn't implement the object correctly)
const customEvent = typeof CustomEvent === 'function'
  ? (name, data) => new CustomEvent(name, { detail: data, bubbles: true })
  : (name, data) => {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, true, true, data);
    return evt;
  };



/**
 * Trigger one or more events on a DOM element.
 * @param  {HTMLElement} elm - DOM Element to trigger the event on
 * @param  {String|Array<String>} eventNames - Event names to trigger
 * @param  {Object} [data] - Extra data to add to the triggered event
 * @return {HTMLElement|NULL} - The 'elm' or NULL
 */
export default function trigger(elm, eventNames, data) {
  if(!elm) { return null; }

  if(isFunction(elm.dispatchEvent)) {
    if(isArray(eventNames)) { eventNames = eventNames.join(' '); }
    words(eventNames, (name) => elm.dispatchEvent(customEvent(name, data)));
  }

  return elm;
}
