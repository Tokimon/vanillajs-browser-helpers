/**
 * Is the given object a DOM document node
 *
 * @param obj - The object to check
 * @return Is it a DOM document node or not
 */
export default function isDOMDocument(obj: unknown): obj is Document {
  if (!obj || !obj.defaultView) { return false; }
  return obj instanceof obj.defaultView.Document;
}
