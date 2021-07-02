interface BoxModelSectionMapping {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

interface BoxModelMapping {
  margin: BoxModelSectionMapping
  padding: BoxModelSectionMapping
  border: BoxModelSectionMapping
}



const num = (n: string) => parseInt(n, 10);



/**
 * Parses the box model numbers of an given Element (margin, padding and border widths)
 *
 * @param elm - The element to parse numbers from
 * @returns The mapping of the box model
 *
 * @example
 *
 * ```ts
 * boxModel(someDiv);
 * ```
 */
export default function boxModel(elm: Element): BoxModelMapping {
  const style = window.getComputedStyle(elm);

  return {
    margin: {
      top: num(style.marginTop),
      left: num(style.marginLeft),
      bottom: num(style.marginBottom),
      right: num(style.marginRight)
    },

    padding: {
      top: num(style.paddingTop),
      left: num(style.paddingLeft),
      bottom: num(style.paddingBottom),
      right: num(style.paddingRight)
    },

    border: {
      top: num(style.borderTopWidth),
      left: num(style.borderLeftWidth),
      bottom: num(style.borderBottomWidth),
      right: num(style.borderRightWidth)
    }
  };
}
