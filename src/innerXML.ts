const manualInnerXml = (XMLNode: Element) => {
  const serializer = new XMLSerializer();

  return Array
    .from(XMLNode.childNodes, (child) => serializer.serializeToString(child))
    .join('');
};

/**
 * Gets the inner XML structure as a string from a XML element
 * (like innerHTML but for XML elements - eg. in SVG)
 *
 * @param XMLNode - The XML node to grab the inner XML structure from
 * @return The inner XML structure
 *
 * @example
 *
 * ```ts
 * // String is already HTML so it is returned as is
 * innerXML(<svg><g><path /></g></svg>);
 * // -> '<g><path /></g>'
 * ```
 */
export default function innerXML(XMLElement: Element): string {
  return XMLElement.innerHTML !== undefined
    ? XMLElement.innerHTML
    : manualInnerXml(XMLElement);
}
