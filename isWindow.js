import objectType from 'vanillajs-helpers/objectType';



/**
 * Is the given object a Window object
 *
 * @function isWindow
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a Window object or not
 */
export default function isWindow(obj) {
  return !!obj && (!!obj.self || objectType(obj) === 'window');
}
