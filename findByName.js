import isString from './isString';
import isArray from './isArray';
import iterate from './iterate';

export default function findByName(names) {
  // Is it is a string split by comma (convert to Array)
  if(isString(names)) { names = names.split(/[\s,]+/); }

  // 'names' has to be an Array at this point
  if(!isArray(names)) { return []; }

  if(names.length < 2) { return Array.from(document.getElementsByName(names[0])); }

  return Array.from(names.reduce((set, name) => {
    iterate(document.getElementsByName(name), (elm) => set.add(elm));
    return set;
  }, new Set()));
}
