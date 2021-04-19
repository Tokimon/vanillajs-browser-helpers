/**
 * Is the given object a DOM Node
 *
 * @param obj - The object to check
 * @return Is it a DOM node or not
 */
export default function isDOMNode(node: unknown): node is Node {
  return !!node && typeof (node as Node).nodeType !== 'undefined';
}
