import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Is the given object a DOM element node and of a given type
 * @param {Object} obj - The object to check
 * @param  {String|Array<String>} [tags] - Tag name to match
 * @return {Boolean} - Is it a DOM element node or not and of the right type
 */
export default function isDOMElement(obj, tags) {
  const isElm = obj instanceof Element;
  if(isString(tags)) { tags = tags.split(/[ ,]+/); }
  if(!isElm || !isArray(tags)) { return isElm; }
  const tagname = obj.tagName.toLowerCase();
  return tags.some((tag) => tag.toLowerCase() === tagname);
}
