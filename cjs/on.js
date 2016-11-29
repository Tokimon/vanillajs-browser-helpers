'use strict';

exports.default = on;

var _eachWord = require('vanillajs-helpers/eachWord');

var _eachWord2 = _interopRequireDefault(_eachWord);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bind event handler for one or more event names (seperated by space).
 * @param  {HTMLElement} elm - HTML Element to bind the event to
 * @param  {String} eventNames - Space seperated string of event names to bind the handler to
 * @param  {Function} handler - Handler to bind to the event(s)
 * @return {HTMLElement} - The 'elm' or NULL
 */
function on(elm, eventNames, handler) {
  if (!elm) {
    return null;
  }

  if ((0, _isFunction2.default)(elm.addEventListener) && (0, _isFunction2.default)(handler)) {
    if ((0, _isArray2.default)(eventNames)) {
      eventNames = eventNames.join(' ');
    }
    (0, _eachWord2.default)(eventNames, name => elm.addEventListener(name, handler, false));
  }

  return elm;
}