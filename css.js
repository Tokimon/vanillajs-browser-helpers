import isDOMElement from './isDOMElement';
import type from './objectType';

/**
 * Get current styling of a HTML element and optionally set given style first
 * @param  {HTMLElement} elm - HTML Element to get the style from
 * @param  {Object} [pseudo] - Pseudo element to get the styling from
 * @param  {Object} [style] - Styling to set on the element
 * @return {Object|null} - Current styling on the element
 */
export default function css(elm, pseudo, style) {
  if(!isDOMElement(elm)) { return null; }

  if(!/^[:]*(before|after)$/.test(pseudo)) {
    style = pseudo;
    pseudo = null;
  } else {
    style = null;
  }

  if(pseudo) { pseudo = `:${pseudo.replace(/^[:]+/g, '')}`; }

  const styleType = type(style);

  // If styles are defined, then add them to the elments inline style
  if(styleType === 'object') {
    // Go through each style
    Object.keys(style).forEach((key) => {
      // Set the style
      const val = style[key].match(/(.*)(?:\s+[!](important))?$/);
      elm.style.setProperty(key, val[1], val[2] || '');
    });
  }

  // TODO: Find a way to return null when pseudo is defined but there is no pseudo element for the element
  const computed = window.getComputedStyle(elm, pseudo);
  return styleType === 'string' ? computed[style] : computed;
}
