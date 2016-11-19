import words from './eachWord';
import isString from './isString';
import isFunction from './isFunction';

// Determine the method to create the correct CustomEvent object
// (IE 11 and below doesn't implement the object correctly)
const customEvent = typeof CustomEvent === 'function' ?
    (name, data) => new CustomEvent(name, { detail: data, bubbles: true }) :
    (name, data) => {
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, true, true, data);
      return evt;
    };



/**
 * Trigger event handlers for one or more event names (seperated by space)
 * @param  {HTMLElement} elm - HTML Element to trigger the event from
 * @param  {String} eventNames - Space seperated string of event names to trigger
 * @param  {Object} data - Extra data to add to the triggered event
 * @return {Number} - The number of event mentioned
 */
export default function trigger(elm, eventNames, data) {
  if(!elm) { return null; }

  if(isFunction(elm.dispatchEvent)) {
    words(eventNames, (name) => elm.dispatchEvent(customEvent(name, data)));
  }

  return elm;
}
