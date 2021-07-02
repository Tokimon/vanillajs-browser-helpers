import isDocument from './isDocument';
import isDOMNode from './isDOMNode';
import isWindow from './isWindow';

export default function getCurrentDocument(obj: unknown): Document | null {
  if (isDocument(obj)) { return obj as Document; }
  if (isWindow(obj)) { return obj.document; }
  if (!isDOMNode(obj)) { return null; }

  return obj.ownerDocument;
}
