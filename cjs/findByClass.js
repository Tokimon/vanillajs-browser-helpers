'use strict';

exports.default = findByClass;

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _iterate = require('vanillajs-helpers/iterate');

var _iterate2 = _interopRequireDefault(_iterate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds DOM elements with a given class name
 * @param  {String|Array<String>} classNames - Class name to find elements by
 * @param  {HTMLElement} [elm=document] - The DOM element to start the search from
 * @return {Array<HTMLElement>} - List of found DOM elements
 */
function findByClass(classNames, elm) {
  // Is it is a string split by comma (convert to Array)
  if ((0, _isString2.default)(classNames)) {
    classNames = classNames.replace(/\./g, ' ').split(/\s*[,]\s*/);
  }

  // 'clasNames' has to be an Array
  if (!(0, _isArray2.default)(classNames)) {
    return [];
  }

  // 'elm' must be an object with the 'getElementsByClassName' implementation
  if (!elm || !elm.getElementsByClassName) {
    elm = document;
  }

  // If only one expression have been passed in return the result as an Array
  if (classNames.length < 2) {
    return Array.from(elm.getElementsByClassName(classNames[0]));
  }

  // If several expressions have been passed in
  // we need to create an unique array of the found nodes
  return Array.from(classNames.reduce((set, cn) => {
    (0, _iterate2.default)(elm.getElementsByClassName(cn), node => set.add(node));
    return set;
  }, new Set()));
}