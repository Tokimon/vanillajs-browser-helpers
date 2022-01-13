import addClass from './addClass';
import removeClass from './removeClass';



/**
 * Replaces css class with another on a DOM element.
 *
 * @param elm - HTML ELement to remove class names from
 * @param classNames - Class names to remove
 * @return Returns element given in 'elm'
 */
export default function replaceClass(
  elm: Element,
  classNames: string | string[],
  replacements: string | string[]
): Element {
  return addClass(removeClass(elm, classNames), replacements);
}
