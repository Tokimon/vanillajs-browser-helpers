import isString from './isString';
import isArray from './isArray';

export default function findByTagName(tags, elm) {
  // Is it is a string split by comma (convert to Array)
  if(isString(tags)) { tags = tags.split(/[\s,]+/); }

  // Tag names has to be an Array
  if(!isArray(tags)) { return []; }

  // 'elm' must be an object with the 'getElementsByTagName' implementation
  if(!elm || !elm.getElementsByTagName) { elm = document; }

  try {
    if(tags.length < 2) { return Array.from(elm.getElementsByTagName(tags[0])); }

    return tags.reduce((arr, tag) => {
      return !isString(tag) ? arr : arr.concat(Array.from(elm.getElementsByTagName(tag)));
    }, []);
  } catch(ex) { return []; }
}
