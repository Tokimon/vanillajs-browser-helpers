export default function innerXML(XMLNode) {
  if('innerHTML' in XMLNode) { return XMLNode.innerHTML; }

  const serializer = new XMLSerializer();

  return Array
    .from(XMLNode.childNodes, (child) => serializer.serializeToString(child))
    .join('');
}
