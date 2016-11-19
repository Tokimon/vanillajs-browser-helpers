import isDOMElement from './isDOMElement';
import isString from './isString';
import isArray from './isArray';

/**
 * Remove one or multiple class names from a HTML Element
 * @param {HTMLElement} elm - HTML ELement to remove class names from
 * @param {String|Array<String>} classNames - Class names to remove
 */
export default function removeCLass(elm, classNames) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return false; }
  classNames.forEach(cn => elm.classList.remove(cn));
}
