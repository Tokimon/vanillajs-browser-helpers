import isDOMNode from './isDOMNode';



interface ChildNodeWithParent extends ChildNode {
  parentElement: HTMLElement,
  parentNode: Node & ParentNode
}



/**
 * Is the given object a DOM node the child of a DOM element
 * 
 * @param obj - The object to check
 * @return Is it a DOM child node or not
 */
export default function isDOMChildNode(obj: any): obj is ChildNodeWithParent {
  return isDOMNode(obj) && !!obj.parentElement;
}
