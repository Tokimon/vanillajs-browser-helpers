Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delegateHandler = delegateHandler;
exports.delegateBuilder = delegateBuilder;

var _on2 = require('./on');

var _on3 = _interopRequireDefault(_on2);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a function that triggers the given handler if the current event target
 * matches the given delegation selector
 * @param  {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param  {Funciton} handler - Handler to triger if delegation selector match
 * @return {Function} - The delegate event handler
 */
function delegateHandler(delegation, handler) {
  if (!(0, _isString2.default)(delegation) || !(0, _isFunction2.default)(handler)) {
    return null;
  }

  return e => {
    let target = e.target;

    // The target matches the delegation selector, so execute the handler
    if ((0, _matches2.default)(target, delegation)) {
      return handler.call(target, e);
    }

    // Taget is a child of the delegation selector target, so loop up the parents
    // to find the right target
    if ((0, _matches2.default)(target, `${ delegation } *`)) {
      target = target.parentElement;
      while (!(0, _matches2.default)(target, delegation)) {
        target = target.parentElement;
      }
      handler.call(target, e);
    }
  };
}

/**
 * Build an event binder that will bind delegated event handlers
 *
 * @param  {Function} on - The method to use bind event handlers
 * @param  {Function} off - The method to use to remove event handlers
 * @return {Function} - The delegate event binder
 */
function delegateBuilder(on = _on3.default) {
  if (!(0, _isFunction2.default)(on)) {
    return null;
  }

  return (elm, eventNames, delegation, handler) => {
    const delHandler = delegateHandler(delegation, handler);
    if (!delHandler) {
      return null;
    }

    on(elm, eventNames, delHandler);
    // We return the delegation handler so you might unbind it again
    return delHandler;
  };
}

/**
 * Bind a delegated event handler for one or more event names on a DOM element.
 *
 * @param  {HTMLElement} elm - DOM element to unbind the event from
 * @param  {String|Array<String>} eventNames - Event names to bind the handler to
 * @param  {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param  {Function} handler - Handler to bind to the event
 * @return {Function} - The delegation event handler (so it may be removed again)
 */
const delegate = delegateBuilder();
exports.default = delegate;