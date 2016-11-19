import isDOMDocument from './isDOMDocument';
import isDOMNode from './isDOMNode';

export default function isDOMContainer(elm) {
  return isDOMNode(elm) && (elm.nodeType === 1 || elm.nodeType === 11);
}
