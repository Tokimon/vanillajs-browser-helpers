import isDOMNode from './isDOMNode';

/**
 * Is the given object a Document Fragment
 *
 * @param obj - The object to check
 * @return Is it a Document Fragment or not
 */
export default function isDOMFragment(obj: unknown): obj is DocumentFragment {
  return isDOMNode(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
