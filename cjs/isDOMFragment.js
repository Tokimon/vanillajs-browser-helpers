Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMFragment;
/**
 * Is the given object a Document Fragment
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a Document Fragment or not
 */
function isDOMFragment(obj) {
  return obj instanceof DocumentFragment;
}