Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findById;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find a DOM element with the given ID
 * @param  {String|Array<String>} ids - ID to find the element by
 * @return {HTMLElement|Array<HTMLElement>} - The found element
 */
function findById(ids) {
  // Is it is a string split by comma and/or space (convert to Array)
  if ((0, _isString2.default)(ids)) {
    ids = ids.split(/[\s,]+/);
  }

  // 'ids' has to be an Array at this point
  if (!(0, _isArray2.default)(ids)) {
    return null;
  }

  // If we have only one query, just find and return that
  if (ids.length < 2) {
    return document.getElementById(ids[0]);
  }

  // Search elements from each ID and filter out results that returned NULL
  return ids.map(id => document.getElementById(id)).filter(elm => !!elm);
}