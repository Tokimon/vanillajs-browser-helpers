Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replace;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isDOMNode = require('./isDOMNode');

var _isDOMNode2 = _interopRequireDefault(_isDOMNode);

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

var _after = require('./after');

var _after2 = _interopRequireDefault(_after);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replace a given DOM element with another DOM element or plain HTML string
 * @param {HTMLElement} elm - DOM element to replace
 * @param {HTMLElement|String} replacement - DOM element or plain HTML string to replace {elm}
 * @return {HTMLElement} - The value given in `elm`
 */
function replace(elm, replacement) {
  if (!(0, _isDOMChildNode2.default)(elm)) {
    return elm;
  }

  if ((0, _isString2.default)(replacement)) {
    (0, _after2.default)(elm, replacement);
    return (0, _remove2.default)(elm);
  } else if ((0, _isDOMNode2.default)(replacement)) {
    return elm.parentNode.replaceChild(replacement, elm);
  } else if (replacement === null) {
    return (0, _remove2.default)(elm);
  }

  return elm;
}