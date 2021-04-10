import isDOMDocument from "./isDOMDocument";



/**
 * Is the given object root node of the DOM
 *
 * @param obj - The object to check
 * @return Is it the root node of the DOM or not
 */
export default function isDOMRoot(obj: any): obj is HTMLElement {
  if (!obj) { return false; }

  const doc = obj.ownerDocument;
  return isDOMDocument(doc) && obj === doc.documentElement;
}
