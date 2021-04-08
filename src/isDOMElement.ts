/**
 * Is the given object a DOM element node and optionally of a given type
 *
 * @param obj - The object to check
 * @param tags - Tag name to match
 * @return Is it a DOM element node or not and optionally of the right type
 */
export default function isDOMElement(obj: unknown, tags?: string | string[]): obj is Element {
  const isElm = obj instanceof Element;

  if (!isElm || !tags) { return isElm; }

  if (!Array.isArray(tags)) { tags = [tags]; }

  const tagname = obj.localName;
  return tags.some((tag) => tag.toLowerCase() === tagname);
}
