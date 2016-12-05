/**
 * Is the given object a Document Fragment
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a Document Fragment or not
 */
export default function isDOMFragment(obj) {
  return obj instanceof DocumentFragment;
}
