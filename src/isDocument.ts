import isDOMNode from './isDOMNode';

/**
 * Is the given object a DOM document node
 *
 * @param obj - The object to check
 * @return Is it a DOM document node or not
 */
export default function isDocument(obj: unknown): obj is Document {
  return isDOMNode(obj) && obj.nodeType === Node.DOCUMENT_NODE;
}
