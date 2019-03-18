/**
 * Gets the inner XML structure as a string from a XML element
 * (like innerHTML but for XML elements - eg. in SVG)
 *
 * @function innerXML
 * @param  {Node} XMLNode - The XML node to grab the inner XML structure from
 * @return {String} - The inner XML structure
 */
export default function innerXML(XMLNode) {
  if (!(XMLNode instanceof Node)) { return ''; }

  if (XMLNode.innerHTML !== void 0) {
    return XMLNode.innerHTML;
  }

  const serializer = new XMLSerializer();

  return Array
    .from(XMLNode.childNodes, (child) => serializer.serializeToString(child))
    .join('');
}
