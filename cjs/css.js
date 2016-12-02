'use strict';

exports.default = css;

var _isObject = require('vanillajs-helpers/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _dashed = require('vanillajs-helpers/dashed');

var _dashed2 = _interopRequireDefault(_dashed);

var _isDOMElement = require('./isDOMElement');

var _isDOMElement2 = _interopRequireDefault(_isDOMElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get current styling of a DOM element and optionally set given style first
 * @param  {HTMLElement} elm - DOM element to get the style from
 * @param  {Object} [pseudo] - Pseudo element to get the styling from
 * @param  {Object} [style] - Styling to set on the element
 * @return {Object|null} - Current styling on the element
 */
function css(elm, pseudo, style) {
  if (!(0, _isDOMElement2.default)(elm)) {
    return null;
  }

  // TODO: Find a way to return null when pseudo is defined but there is no pseudo element for the element
  if (/^[:]{0,2}(before|after)$/.test(pseudo)) {
    pseudo = pseudo.replace(/^[:]*/g, ':');
    if (!(0, _isString2.default)(style)) {
      style = null;
    }
  } else {
    style = pseudo;
    pseudo = null;
  }

  // If styles are defined, then add them to the elments inline style
  if ((0, _isObject2.default)(style)) {
    // Go through each style
    Object.keys(style).forEach(key => {
      // Set the style
      const val = style[key].match(/(.*)(?:\s+[!](important))?$/);
      elm.style.setProperty((0, _dashed2.default)(key), val[1], val[2] || '');
    });
  }

  const computed = window.getComputedStyle(elm, pseudo);
  if (!(0, _isString2.default)(style)) {
    return computed;
  }

  const val = computed.getPropertyValue((0, _dashed2.default)(style));
  if (!val) {
    return null;
  }
  return style === 'content' ? `${ val }`.replace(/^"|"$/g, '') : val;
}