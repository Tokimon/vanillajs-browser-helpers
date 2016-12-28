import isDOMElement from './isDOMElement';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Does all (or any) of the listed class names exist in the DOM elements list of class names
 * @function hasClass
 * @param {DOM element} elm - DOM element to test
 * @param {String|String[]} classNames - Class names to test
 * @param {Boolean} [any] - Test if at least one class name exist
 * @return {Boolean} All/any class name listed were found in the elements list of class names
 */
export default function hasClass(elm, classNames, any = false) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return false; }
  return classNames[any ? 'some' : 'every']((cn) => elm.classList.contains(cn));
}

export function hasAnyClass(elm, classNames) {
  return hasClass(elm, classNames, true);
}
