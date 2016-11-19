export default function isDOMChildNode(elm) {
  return !!(elm && elm.parentNode && elm.parentNode.nodeType === 1);
}
