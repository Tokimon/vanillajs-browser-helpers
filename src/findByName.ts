import uniqueElementList from './uniqueElementList';



const byName = (name: string) => document.getElementsByName(name);



/**
 * Find DOM elements with the given name
 * 
 * @param names - Value of name attribute to find the elements by
 * @return List of found DOM elements
 */
export default function findByName(names: string | string[]) {
  return uniqueElementList(names, byName);
}
