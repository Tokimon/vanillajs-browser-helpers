import isDOMElement from './isDOMElement';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Adds one or multiple class names to a DOM element
 * @function addClass
 * @param {HTMLElement} elm - HTML ELement to add class names to
 * @param {String|String[]} classNames - Class names to add
 * @return {HTMLElement} The given `elm`
 */
export default function addClass(elm, classNames) {
  if (isString(classNames)) { classNames = classNames.split(/[ ,]+/); }
  if (!isDOMElement(elm) || !isArray(classNames)) { return elm; }
  classNames.forEach(cn => elm.classList.add(cn));
  return elm;
}
