import isDOMElement from './isDOMElement';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

/**
 * Remove one or multiple class names from a DOM element
 * @param {HTMLElement} elm - HTML ELement to remove class names from
 * @param {String|Array<String>} classNames - Class names to remove
 * @return {HTMLElement} - Returns element given in 'elm'
 */
export default function removeCLass(elm, classNames) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return elm; }
  classNames.forEach(cn => elm.classList.remove(cn));
  return elm;
}
