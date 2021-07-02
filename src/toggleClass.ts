/**
 * Toggles (add/remove) one or multiple class names on a DOM element
 *
 * @param elm - DOM element to toggle class names from
 * @param classNames - Class names to toggle
 * @param force - Force to add/remove the given class names (true = add, false = remove)
 * @return The given `elm`
 */
export default function toggleClass(
  elm: Element,
  classNames: string | string[],
  force?: boolean
): Element {
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }

  classNames.forEach((cn) => elm.classList.toggle(cn, force));

  return elm;
}
