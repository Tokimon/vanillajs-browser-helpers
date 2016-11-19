import isArray from './isArray';

export default function isDOMElement(elm, ...tags) {
  const isElm = !!elm && elm.nodeType === 1;
  if(!isElm || !tags.length) { return isElm; }
  return (isArray(tags) ? tags : [tags]).indexOf(elm.tagName.toLowerCase()) > -1;
}
