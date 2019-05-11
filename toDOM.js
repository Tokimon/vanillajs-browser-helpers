import isString from 'vanillajs-helpers/isString';



/**
 * Convert HTML into DOM node(s)
 *
 * **Note**: To keep the method simple and short, this method uses the `<template />`
 * element to convert the HTML. For older browsers, either
 * use a polyfill like `@webcomponents/template` a more elaborate HTML parser
 * (like `parsehtml` or `html-parser`)
 *
 * **Polyfills needed:**
 * - `<template>` element (eg. ` @webcomponents/template`)
 * @function toDOM
 * @param {String} html - HTML string to transform into nodes
 * @return {HTMLElement[]} DOM elements that the HTML represented
 */
export default function toDOM(html) {
  if (!isString(html) || /<(html|body|head|frame(set)?)\b/.test(html)) {
    return html;
  }

  let template = document.createElement('template');
  template.innerHTML = html;
  return template.content.children;
}
