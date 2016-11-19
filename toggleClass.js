import isDOMElement from './isDOMElement';
import isString from './isString';
import isArray from './isArray';

/**
 * Toggles (add/remove) one or multiple class names on a HTML Element
 * @param {HTMLElement} elm - HTML Element to toggle class names from
 * @param {String|Array<String>} classNames - Class names to toggle
 * @param {Boolean} force - Force to add or remove (true = add, false = remove)
 */
export default function toggle(elm, classNames, force) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/) }
  if(!isDOMElement(elm) || !isArray(classNames)) { return false; }
  classNames.forEach((cn) => elm.classList.toggle(cn, force));
}
