import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isBoolean from 'vanillajs-helpers/isBoolean';

import isDOMElement from './isDOMElement';

/**
 * Toggles (add/remove) one or multiple class names on a DOM Element
 * @param {HTMLElement} elm - DOM Element to toggle class names from
 * @param {String|Array<String>} classNames - Class names to toggle
 * @param {Boolean} force - Force to add or remove (true = add, false = remove)
 */
export default function toggle(elm, classNames, force) {
  if(isString(classNames)) { classNames = classNames.split(/\s+/); }
  if(!isDOMElement(elm) || !isArray(classNames)) { return elm; }

  // Some Browsers requires the method to not be called with the force paramter if it is not a boolean
  force = isBoolean(force) ? [force] : [];
  classNames.forEach((cn) => elm.classList.toggle(cn, ...force));

  return elm;
}
