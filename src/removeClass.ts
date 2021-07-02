/**
 * Remove one or multiple class names from a DOM element
 *
 * @param elm - HTML ELement to remove class names from
 * @param classNames - Class names to remove
 * @return Returns element given in 'elm'
 */
export default function removeClass(elm: Element, classNames: string | string[]): Element {
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }

  elm.classList.remove(...classNames);

  return elm;
}
