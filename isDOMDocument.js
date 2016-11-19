export default function isDOMDocument(elm) {
  return !!elm && elm.nodeType === 9;
}
