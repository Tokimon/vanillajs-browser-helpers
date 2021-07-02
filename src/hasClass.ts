import isString from 'vanillajs-helpers/isString';



/**
 * Does all (or any) of the listed class names exist in the DOM elements list of class names
 *
 * @param elm - DOM element to test
 * @param classNames - Class names to test
 * @param any - Test if at least one class name exist
 * @return All/any class names listed were found in the elements list of class names
 */
function hasClass(
  elm: Element,
  classNames: string | string[],
  any?: boolean
): boolean {
  const checkFn = any ? 'some' : 'every';
  const cns = isString(classNames) ? [classNames] : classNames;

  return cns[checkFn]((cn) => elm.classList.contains(cn));
}

export default hasClass;



/**
 * Does any of the listed class names exist in the DOM elements list of class names
 *
 * @param elm - DOM element to test
 * @param classNames - Class names to test
 * @return At least one of the class names listed were found in the elements list of class names
 */
export function hasAnyClass(
  elm: Element,
  classNames: string | string[]
):boolean {
  return hasClass(elm, classNames, true);
}
