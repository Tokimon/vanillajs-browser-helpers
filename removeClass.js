import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

import isDOMElement from './isDOMElement';



/**
 * Remove one or multiple class names from a DOM element
 * @function removeClass
 * @param {HTMLElement} elm - HTML ELement to remove class names from
 * @param {String|String[]} classNames - Class names to remove
 * @return {HTMLElement} Returns element given in 'elm'
 */
export default function removeClass(elm, classNames) {
  if (!isDOMElement(elm)) { return elm; }

  if (isString(classNames)) {
    classNames = [classNames];
  }

  if (isArray(classNames)) {
    elm.classList.remove(...classNames);
  }

  return elm;
}
