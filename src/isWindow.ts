import objectType from 'vanillajs-helpers/objectType';



/**
 * Is the given object a Window object
 *
 * @param obj - The object to check
 * @return Is it a Window object or not
 */
export default function isWindow(obj: unknown): obj is Window {
  return !!obj && (!!obj.self || objectType(obj) === 'window');
}
