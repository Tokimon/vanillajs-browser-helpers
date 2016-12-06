Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trigger;

var _eachWord = require('vanillajs-helpers/eachWord');

var _eachWord2 = _interopRequireDefault(_eachWord);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine the method to create the correct CustomEvent object
// (IE 11 and below doesn't implement the object correctly)
const customEvent = typeof CustomEvent === 'function' ? (name, data) => new CustomEvent(name, { detail: data, bubbles: true }) : (name, data) => {
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
function trigger(elm, eventNames, data) {
  if (!elm) {
    return null;
  }

  if ((0, _isFunction2.default)(elm.dispatchEvent)) {
    if ((0, _isArray2.default)(eventNames)) {
      eventNames = eventNames.join(' ');
    }
    (0, _eachWord2.default)(eventNames, name => elm.dispatchEvent(customEvent(name, data)));
  }

  return elm;
}