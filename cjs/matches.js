'use strict';

exports.default = matches;

var _prefixed = require('./prefixed');

var _prefixed2 = _interopRequireDefault(_prefixed);

var _inDOM = require('./inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine the supported method of 'matches' (with or without prefixes)
const body = document.body;
const _matchMethod = body.matches || body[(0, _prefixed2.default)('MatchesSelector').filter(method => !!body[method])[0]];

/**
 * Determines whether or not a DOM element matches a given CSS query selector
 * @param  {DOM element} elm - DOM element to test
 * @param  {String} selector - CSS selector {elm} should match
 * @return {Boolean} - Whether or not {elm} matched the selector
 */
function matches(elm, selector = '') {
  if (!(0, _inDOM2.default)(elm)) {
    return false;
  }
  return _matchMethod.call(elm, selector);
}