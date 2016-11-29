'use strict';

exports.default = trigger;

var _eachWord = require('vanillajs-helpers/eachWord');

var _eachWord2 = _interopRequireDefault(_eachWord);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine the method to create the correct CustomEvent object
// (IE 11 and below doesn't implement the object correctly)
const customEvent = typeof CustomEvent === 'function' ? (name, data) => new CustomEvent(name, { detail: data, bubbles: true }) : (name, data) => {
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
function trigger(elm, eventNames, data) {
  if (!elm) {
    return null;
  }

  if ((0, _isFunction2.default)(elm.dispatchEvent)) {
    (0, _eachWord2.default)(eventNames, name => elm.dispatchEvent(customEvent(name, data)));
  }

  return elm;
}