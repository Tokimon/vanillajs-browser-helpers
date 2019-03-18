import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Is the given object a DOM element node and of a given type
 *
 * @function isDOMElement
 * @param {Object} obj - The object to check
 * @param {String|String[]} [tags] - Tag name to match
 * @return {Boolean} Is it a DOM element node or not and optionally of the right type
 */
export default function isDOMElement(obj, tags) {
  const isElm = obj instanceof Element;
  if (isString(tags)) { tags = [tags]; }
  if (!isElm || !isArray(tags)) { return isElm; }

  const tagname = obj.localName;
  return tags.some((tag) => tag.toLowerCase() === tagname);
}
