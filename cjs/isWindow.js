"use strict";

exports.default = isWindow;
/**
 * Is the given object a Window object
 * @param  {Object} obj - The object to check
 * @return {Boolean} - Is it a Window object or not
 */
function isWindow(obj) {
  if (!obj || !obj.self) {
    return false;
  }
  return obj instanceof obj.self.Window;
}