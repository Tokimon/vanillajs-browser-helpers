/**
 * Is the given object a Window object
 * @function isWindow
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a Window object or not
 */
export default function isWindow(obj) {
  if(!obj || !obj.self) { return false; }
  return obj instanceof obj.self.Window;
}
