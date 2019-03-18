import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isBoolean from 'vanillajs-helpers/isBoolean';

import isDOMElement from './isDOMElement';



/**
 * Toggles (add/remove) one or multiple class names on a DOM element
 * @function toggle
 * @param {HTMLElement} elm - DOM element to toggle class names from
 * @param {String|String[]} classNames - Class names to toggle
 * @param {Boolean} force - Force to add/remove the given class names (true = add, false = remove)
 * @return {HTMLElement} The given `elm`
 */
export default function toggleClass(elm, classNames, force) {
  if (!isDOMElement(elm)) { return elm; }

  const toggle = isBoolean(force)
    ? (cn) => elm.classList.toggle(cn, force)
    : (cn) => elm.classList.toggle(cn);

  if (isString(classNames)) {
    toggle(classNames);
  } else if (isArray(classNames)) {
    classNames.forEach(toggle);
  }

  return elm;
}
