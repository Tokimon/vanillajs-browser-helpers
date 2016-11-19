import isDOMElement from './isDOMElement';
import isString from './isString';
import isArray from './isArray';

/**
 * Does all listed class names exist in the elements list of class names
 * @param  {HTML Element} elm - HTML Element to test
 * @param  {String|Array<String>} classNames - Class names to test
 * @return {Boolean} - All class name listed were found in the elements list of class names
 */
export default function hasClass(elm, classNames, any = false) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return false; }
  return classNames[any ? 'some' : 'every']((cn) => elm.classList.contains(cn));
}

export function hasAnyClass(elm, classNames) {
  return hasClass(elm, classNames, true);
}
