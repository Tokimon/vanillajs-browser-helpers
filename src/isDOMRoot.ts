import getCurrentDocument from './getCurrentDocument';



/**
 * Is the given object root node of the DOM
 *
 * @param obj - The object to check
 * @return Is it the root node of the DOM or not
 */
export default function isDOMRoot(obj: unknown): obj is HTMLElement {
  const doc = getCurrentDocument(obj);
  return !!doc && obj === doc.documentElement;
}
