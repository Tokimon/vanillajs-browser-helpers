import children from './children';
import isDOMChildNode from './isDOMChildNode';



/**
 * Find the index of a DOM element amongst its siblings
 *
 * @param elm - DOM element to find the index of
 * @return The index of `elm`
 *
 * @example
 *
 * ```ts
 * elmIndex(someDiv);
 * ```
 */
export default function elmIndex(elm: Element): number {
  return isDOMChildNode(elm)
    ? children(elm.parentNode).indexOf(elm)
    : -1;
}
