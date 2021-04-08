import isDOMElement from './isDOMElement';
import isDOMFragment from './isDOMFragment';



/**
 * Is the given object a DOM node that can contain child DOM nodes
 *
 * @param obj - The object to check
 * @return Is it a DOM container or not
 */
export default function isDOMContainer(obj: unknown): boolean {
  return isDOMElement(obj) || isDOMFragment(obj);
}
