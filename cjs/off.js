'use strict';

exports.default = off;

var _eachWord = require('vanillajs-helpers/eachWord');

var _eachWord2 = _interopRequireDefault(_eachWord);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Removed an event handler from one or more event names on a DOM element.
 * @param  {HTMLElement} elm - DOM Element to unbind the event from
 * @param  {String|Array<String>} eventNames - Event names to remove the handler from
 * @param  {Function} handler - Handler to unbind from the event
 * @return {HTMLElement|NULL} - The 'elm' or NULL
 */
function off(elm, eventNames, handler) {
  if (!elm) {
    return null;
  }

  if ((0, _isFunction2.default)(elm.removeEventListener) && (0, _isFunction2.default)(handler)) {
    if ((0, _isArray2.default)(eventNames)) {
      eventNames = eventNames.join(' ');
    }
    (0, _eachWord2.default)(eventNames, name => elm.removeEventListener(name, handler, false));
  }

  return elm;
}