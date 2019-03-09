/**
 * Is the given object root node of the DOM
 *
 * @function isDOMRoot
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it the root node of the DOM or not
 */
export default function isDOMRoot(obj) {
  if (!obj) { return false; }

  const doc = obj.ownerDocument;
  return !!doc && obj === doc.documentElement;
}
