import isString from 'vanillajs-helpers/isString';
import children from './children';

/**
 * Convert HTML into DOM node(s)
 * @param  {String} html - HTML string to transform into nodes
 * @return {Array<HTMLElement>} - DOM Elements that the HTML represented
 */
export default function toDOM(html) {
  if(!isString(html)) { return html; }

  const div = document.createElement('div');
  div.innerHTML = html;

  return children(div);
}
