import isDOMNode from './isDOMNode';

/**
 * Is the given object a DOM element node and optionally of a given type
 *
 * @param obj - The object to check
 * @param tags - Tag name to match
 * @return Is it a DOM element node or not and optionally of the right type
 */
export default function isDOMElement(obj: unknown, tags?: string | string[]): obj is Element {
  if (!isDOMNode(obj)) { return false; }

  const isElm = obj.nodeType === Node.ELEMENT_NODE;

  if (!isElm || !tags) { return isElm; }

  if (!Array.isArray(tags)) { tags = [tags]; }

  const { tagName } = obj as Element;
  return tags.some((tag) => tag.toUpperCase() === tagName);
}
