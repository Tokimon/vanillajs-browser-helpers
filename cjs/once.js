'use strict';

exports.onceBuilder = onceBuilder;

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _on2 = require('./on');

var _on3 = _interopRequireDefault(_on2);

var _off2 = require('./off');

var _off3 = _interopRequireDefault(_off2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build an event binder that will bind event handlers that are triggered only once
 *
 * @param  {Function} on - The method to use bind event handlers
 * @param  {Function} off - The method to use to remove event handlers
 * @return {Function} - The single fire event binder function
 */
function onceBuilder(on, off) {
  if (!(0, _isFunction2.default)(on)) {
    on = _on3.default;
  }
  if (!(0, _isFunction2.default)(off)) {
    off = _off3.default;
  }

  return (elm, eventNames, handler) => {
    if (!(0, _isFunction2.default)(handler)) {
      return null;
    }

    const _one = function (e) {
      off(elm, e.type, _one);
      return handler.call(this, e);
    };

    on(elm, eventNames, _one);

    return _one;
  };
}

/**
 * Bind a single fire event handler for one or more event names on a DOM element.
 *
 * @param  {HTMLElement} elm - DOM Element to unbind the event from
 * @param  {String|Array<String>} eventNames - Event names to bind the handler to
 * @param  {Function} handler - Handler to bind to the event
 * @return {Function} - The single fire event handler (so it may be removed again)
 */
const once = onceBuilder();
exports.default = once;