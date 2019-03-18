import parseSelector from './parseSelector';



const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];



/**
 * Converts a given CSS selector into HTML (limited to only one element)
 * @function selectorToHTML
 * @param  {String} selector - The CSS selector to convert
 * @return {String} The parsed HTML
 */
export default function selectorToHTML(selector) {
  const { tagName: tag, attributes } = parseSelector(selector);

  const atts = Object.keys(attributes)
    .map((att) => attributes[att] ? `${att}="${attributes[att]}"` : att);

  const start = `<${tag}${atts.length ? ` ${atts.join(' ')}` : ''}>`;
  const end = voidTags.includes(tag) ? '' : `</${tag}>`;

  return start + end;
}
