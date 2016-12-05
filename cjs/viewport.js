'use strict';

exports.default = viewport;

var _isDOMDocument = require('./isDOMDocument');

var _isDOMDocument2 = _interopRequireDefault(_isDOMDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the current viewport element (scrolling element) of the current document
 * @param  {Document|Window|HTMLElement} [doc=document] - Element to find the viewport element from
 * @return {HTMLElement} - The viewport element
 */
function viewport(doc) {
  doc = doc || document;
  if (!(0, _isDOMDocument2.default)(doc)) {
    doc = doc.ownerDocument || doc.document;
    if (!doc) {
      return null;
    }
  }

  return doc.scrollingElement || (doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement);
}