Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDOM;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _children = require('./children');

var _children2 = _interopRequireDefault(_children);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert HTML into DOM node(s)
 * @param  {String} html - HTML string to transform into nodes
 * @return {Array<HTMLElement>} - DOM elements that the HTML represented
 */
function toDOM(html) {
  if (!(0, _isString2.default)(html)) {
    return html;
  }

  const div = document.createElement('div');
  div.innerHTML = html;

  return (0, _children2.default)(div);
}