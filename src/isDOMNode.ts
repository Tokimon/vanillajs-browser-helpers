/**
 * Is the given object a Element, Text or Comment Node in the DOM
 *
 * @param obj - The object to check
 * @return Is it a DOM node or not
 */
export default function isDOMNode(obj: any): obj is Element | Text | Comment {
  const type = (obj || {}).nodeType;
  return type === Node.ELEMENT_NODE
    || type === Node.TEXT_NODE
    || type === Node.COMMENT_NODE;
}
