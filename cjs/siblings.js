Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = siblings;
exports.next = next;
exports.prev = prev;

var _isDOMChildNode = require('./isDOMChildNode');

var _isDOMChildNode2 = _interopRequireDefault(_isDOMChildNode);

var _children = require('./children');

var _children2 = _interopRequireDefault(_children);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all sibling elements of a given DOM element
 * @param  {HTMLElement} elm - DOM element to find siblings of
 * @return {Array<HTMLElement>} - Collection of sibling elements
 */
function siblings(elm) {
  if (!(0, _isDOMChildNode2.default)(elm)) {
    return [];
  }
  return (0, _children2.default)(elm.parentNode).filter(child => child !== elm);
}

/**
 * Get the next sibling element of a DOM element
 * @param  {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {HTMLElement|null} - The next sibling element or null
 */
function next(elm) {
  return (0, _isDOMChildNode2.default)(elm) ? elm.nextElementSibling : null;
}

/**
 * Get the previous sibling element of a DOM element
 * @param  {HTMLElement} elm - The HTMLElement to find the sibling of
 * @return {[type]} - The previous sibling element or null
 */
function prev(elm) {
  return (0, _isDOMChildNode2.default)(elm) ? elm.previousElementSibling : null;
}