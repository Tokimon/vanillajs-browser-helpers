import isObject from 'vanillajs-helpers/isObject';
import isString from 'vanillajs-helpers/isString';
import dashed from 'vanillajs-helpers/dashed';

import isDOMElement from './isDOMElement';

/**
 * Get current computed styling from a DOM element. it takes a second argument for which
 * there are two possibilities:
 * - Object ({ [prop]: 'value' }): those styles are set on the element before returning the computed style
 * - String: Return only the value of that specific property
 * @function css
 * @param {HTMLElement} elm - DOM element to get the style from
 * @param {Object|string} [style] - Styling to set on the element (object)
 *                                  or style property to get from the element (string)
 * @return {Object|null} Current styling on the element
 */
export default function css(elm, style) {
  if (!isDOMElement(elm)) { return null; }

  // If styles are defined, then add them to the elments inline style
  if (isObject(style)) {
    // Go through each style
    Object.keys(style).forEach((key) => {
      // Set the style
      const val = style[key].match(/^(.+)(?:\s+[!](important))?$/);

      if (val) {
        elm.style.setProperty(dashed(key), val[1], val[2] || '');
      }
    });
  }

  const computed = window.getComputedStyle(elm);

  return isString(style)
    ? computed.getPropertyValue(dashed(style)) || null
    : computed;
}
