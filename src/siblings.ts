import isDOMChildNode from './isDOMChildNode';
import children from './children';



/**
 * Get all sibling elements of a given DOM element
 *
 * @param elm - DOM element to find siblings of
 * @return Collection of sibling elements
 *
 * @example
 *
 * ```ts
 * siblings(someElement);
 * ```
 */
export default function siblings(elm: Node): Node[] {
  if (!isDOMChildNode(elm)) { return []; }

  return children(elm.parentNode)
    .filter((child: Node) => child !== elm);
}
