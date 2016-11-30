'use strict';

exports.default = data;

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

var _attr = require('./attr');

var _attr2 = _interopRequireDefault(_attr);

var _camelCase = require('vanillajs-helpers/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _dashed = require('vanillajs-helpers/dashed');

var _dashed2 = _interopRequireDefault(_dashed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get/set the value of a 'data-' attribute on a given DOM Element
 * @param  {HTMLElement} elm - The DOM Element to fetch the data from
 * @param  {String} dataName - Name of the 'data-' attribute to handle (eg. id -> data-id)
 * @param  {String|Number} [value] - Value to insert into the 'data-' attribute
 * @return {String|Boolean|null} - Data found in the 'data-' attribute - true (also empty values),
 *                                 null if undefined, false if data attributes are not supported on the element
 */
function data(elm, dataName, value) {
  if (!(0, _isDOMElement2.default)(elm)) {
    return false;
  }
  if (!dataName) {
    return null;
  }

  if (value === true) {
    value = '';
  }

  let oldVal;

  // Fallback to attr (dataset polyfill doesn't really work as intended)
  // - Use removeSttribute to delete the data attribute
  if (!elm.dataset || value === false) {
    // Make sure the names are dashed
    dataName = (0, _dashed2.default)(dataName);
    oldVal = (0, _attr2.default)(elm, `data-${ dataName }`, value);
  } else {
    // Make sure the names are camel cased
    dataName = (0, _camelCase2.default)({ numbers: false })(dataName);
    oldVal = elm.dataset[dataName];
    if (typeof value !== 'undefined') {
      elm.dataset[dataName] = value;
    }
  }

  // Empty string = true all other falsy values = null
  // (normally no numbers or booleans are returned as all is stored as strings,
  // so this affect only null or undefined)
  return oldVal || (oldVal === '' ? true : null);
}