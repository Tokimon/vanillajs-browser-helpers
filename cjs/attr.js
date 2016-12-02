'use strict';

exports.default = attr;

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get/set the value of an attribute on a given DOM element
 * @param  {HTMLElement} elm - The DOM element to fetch the attribute from
 * @param  {String} attrName - Name of the attribute to handle
 * @param  {String|Number} [value] - Value to insert into the attribute
 * @return {String} - Data found in the attribute (the old value if {value} is defined)
 */
function attr(elm, attrName, value) {
  if (!(0, _isDOMElement2.default)(elm) || !attrName) {
    return false;
  }

  const oldVal = elm.getAttribute(attrName);
  if (value === true) {
    value = '';
  }

  if (value === false) {
    elm.removeAttribute(attrName);
  } else if (typeof value !== 'undefined') {
    elm.setAttribute(attrName, value);
  }

  return oldVal;
}