import isString from './isString';
import isArray from './isArray';
import iterate from './iterate';

export default function findByClass(classNames, elm) {
  // Is it is a string split by comma (convert to Array)
  if(isString(classNames)) { classNames = classNames.replace(/\./g, ' ').split(/\s*[,]\s*/); }

  // 'elm' has have the 'getElementsByClassName' implementation
  // and 'clasNames' has to be an Array
  if(!isArray(classNames)) { return []; }

  // 'elm' must be an object with the 'getElementsByClassName' implementation
  if(!elm || !elm.getElementsByClassName) { elm = document; }

  // If only one expression have been passed in return the result as an Array
  if(classNames.length < 2) { return Array.from(elm.getElementsByClassName(classNames[0])); }

  // If several expressions have been passed in
  // we need to create an unique array of the found nodes
  return Array.from(classNames.reduce((set, cn) => {
    iterate(elm.getElementsByClassName(cn), (node) => set.add(node));
    return set;
  }, new Set()));
}
