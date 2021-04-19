import parseSelector from './parseSelector';



const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];



/**
 * Converts a given CSS selector into HTML
 * (No this is not an Emmet substitute, so it is limited to only one element)
 *
 * @param selector - The CSS selector to convert
 * @return The parsed HTML
 *
 * @example
 *
 * ```ts
 * selectorToHTML('#id.class-name');
 * // -> '<div id="id" class="class-name" />'
 * ```
 */
export default function selectorToHTML(selector: string): string {
  const { tagName, attributes } = parseSelector(selector);

  const atts = Object.entries(attributes)
    .map(([att, value]) => ` ${att}${value ? `="${value}"` : ''}`)
    .join('');


  const end = voidTags.includes(tagName) ? ' /' : `></${tagName}`;

  return `<${tagName}${atts}${end}>`;
}
