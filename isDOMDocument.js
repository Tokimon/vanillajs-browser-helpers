/**
 * Is the given object a DOM document node
 * @param {Object} obj - The object to check
 * @return {Boolean} - Is it a DOM document node or not
 */
export default function isDOMDocument(obj) {
  if(!obj || !obj.defaultView) { return false; }
  return obj instanceof obj.defaultView.Document;
}
