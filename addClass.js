import isDOMElement from './isDOMElement';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Adds one or multiple class names to a DOM element
 * @param {HTMLElement} elm - HTML ELement to add class names to
 * @param {String|Array<String>} classNames - Class names to add
 */
export default function addClass(elm, classNames) {
  if(isString(classNames)) { classNames = classNames.split(/[ ,]+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return elm; }
  classNames.forEach(cn => elm.classList.add(cn));
  return elm;
}
