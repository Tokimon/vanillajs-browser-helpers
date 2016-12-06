Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findByTagName;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find elements by given tag name
 * @param  {String|Array<String>} tags - Tag name to find the elements by
 * @param  {HTMLElement} [elm=document] - The DOM element to start the search from
 * @return {Array<HTMLElement>} - List of found DOM elements
 */
function findByTagName(tags, elm) {
  // Is it is a string split by comma (convert to Array)
  if ((0, _isString2.default)(tags)) {
    tags = tags.split(/[\s,]+/);
  }

  // Tag names has to be an Array
  if (!(0, _isArray2.default)(tags)) {
    return [];
  }

  // 'elm' must be an object with the 'getElementsByTagName' implementation
  if (!elm || !elm.getElementsByTagName) {
    elm = document;
  }

  // Find results for each tag
  return tags.reduce((arr, tag) => {
    // The [...elm.getElementsByTagName(tag)] seems to filter out identical tags,
    // so Array.from is preferred
    if (!(0, _isString2.default)(tag)) {
      return arr;
    }
    return arr.concat(Array.from(elm.getElementsByTagName(tag)));
  }, []);
}