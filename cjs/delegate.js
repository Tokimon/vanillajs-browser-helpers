'use strict';

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

function delegateBuilder(on = _on3.default) {
  if (!(0, _isFunction2.default)(on)) {
    return null;
  }

  return (elm, eventNames, delegation, handler) => {
    const delhandler = delegateHandler(delegation, handler);
    on(elm, eventNames, delhandler);
    // We return the delegation handler so you might unbind it again
    return delhandler;
  };
}

const delegate = delegateBuilder();
exports.default = delegate;