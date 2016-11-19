export default function isDOMNode(obj) {
  return !!(obj && obj.nodeType);
}
