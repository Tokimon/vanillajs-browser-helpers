'use strict';

exports.domReadyBuilder = domReadyBuilder;

var _once2 = require('./once');

var _once3 = _interopRequireDefault(_once2);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build a method that executes a given function once the document has finished loading
 * @param  {Function} once - The 'once' (single trigger event) method to use
 * @return {Function} - The 'domReady' method using the given once method
 */
function domReadyBuilder(once = _once3.default) {
  if (!(0, _isFunction2.default)(once)) {
    return null;
  }

  return handler => {
    if (!(0, _isFunction2.default)(handler)) {
      return;
    }
    if (document.readyState === 'complete') {
      return handler();
    }
    return once(document, 'DOMContentLoaded', () => handler());
  };
}

/**
 * Execute a given function once the document has finished loading
 * @param {Function} handler - Function to execute once the document has finished loading
 * @return {Function} - The 'once' event handler (so it may be removed again)
 */
const domReady = domReadyBuilder();
exports.default = domReady;