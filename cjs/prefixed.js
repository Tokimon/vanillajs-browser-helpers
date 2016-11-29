'use strict';

exports.default = prefixed;

var _pascalCase = require('vanillajs-helpers/pascalCase');

var _pascalCase2 = _interopRequireDefault(_pascalCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add vendor prefixes to a string
 * @param  {String} str - String to add vendor prefixes to
 * @return {Array<String>} Array of the various vendor prefixed versions of the string
 */
function prefixed(str) {
  str = (0, _pascalCase2.default)(str);
  return [`webkit${ str }`, `moz${ str }`, `ms${ str }`, `o${ str }`];
}