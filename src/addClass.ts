/**
 * Adds one or multiple class names to a DOM element
 *
 * @param elm - HTML ELement to add class names to
 * @param classNames - Class name(s) to add
 * @return The given `elm`
 */
export default function addClass(elm: Element, classNames: string | string[]): Element {
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }

  elm.classList.add(...classNames);

  return elm;
}
