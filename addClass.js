import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

import isDOMElement from './isDOMElement';



/**
 * Adds one or multiple class names to a DOM element
 * @function addClass
 * @param {HTMLElement} elm - HTML ELement to add class names to
 * @param {String|String[]} classNames - Class names to add
 * @return {HTMLElement} The given `elm`
 */
export default function addClass(elm, classNames) {
  if (!isDOMElement(elm)) { return elm; }

  if (isString(classNames)) { classNames = [classNames]; }

  if (isArray(classNames)) {
    elm.classList.add(...classNames);
  }

  return elm;
}
