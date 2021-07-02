/**
 * Convert HTML into DOM node(s)
 *
 * @param html - HTML string to transform into nodes
 * @return DOM elements that the HTML represented
 *
 * @remarks
 *
 * To keep the method simple and short, this method uses the `<template />`
 * element to convert the HTML. For older browsers, either
 * use a polyfill like `@webcomponents/template` or a more elaborate HTML parser
 * (like `parsehtml` or `html-parser`)
 *
 * @example
 *
 * ```ts
 * // HTML is returned as is, as it cannot be parsed easily
 * toDOM('<html><body><div /></body></html>');
 *
 * // Convert a given HTML string to HTML
 * toDOM('<div><a>link</a></div>')
 * // -> <div><a>link</a></div>
 * ```
 */
export default function toDOM(html: string): string | HTMLCollection {
  if (/<(html|body|head|frame(set)?)\b/.test(html)) {
    return html;
  }

  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content.children;
}
