import isObject from 'vanillajs-helpers/isObject';
import isString from 'vanillajs-helpers/isString';
import dashed from 'vanillajs-helpers/dashed';

import isDOMElement from './isDOMElement';

/**
 * Get current styling of a DOM element and optionally set given style first
 * @param  {HTMLElement} elm - DOM element to get the style from
 * @param  {Object} [pseudo] - Pseudo element to get the styling from
 * @param  {Object} [style] - Styling to set on the element
 * @return {Object|null} - Current styling on the element
 */
export default function css(elm, pseudo, style) {
  if(!isDOMElement(elm)) { return null; }

  // TODO: Find a way to return null when pseudo is defined but there is no pseudo element for the element
  if(/^[:]{0,2}(before|after)$/.test(pseudo)) {
    pseudo = pseudo.replace(/^[:]*/g, ':');
    if(!isString(style)) { style = null; }
  } else {
    style = pseudo;
    pseudo = null;
  }

  // If styles are defined, then add them to the elments inline style
  if(isObject(style)) {
    // Go through each style
    Object.keys(style).forEach((key) => {
      // Set the style
      const val = style[key].match(/(.*)(?:\s+[!](important))?$/);
      elm.style.setProperty(dashed(key), val[1], val[2] || '');
    });
  }


  const computed = window.getComputedStyle(elm, pseudo);
  if(!isString(style)) { return computed; }

  const val = computed.getPropertyValue(dashed(style));
  if(!val) { return null; }
  return style === 'content' ? `${val}`.replace(/^"|"$/g, '') : val;
}
