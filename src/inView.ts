import isDOMChildNode from './isDOMChildNode';
import hidden from './hidden';



interface PositionIndicator {
  /** Inside the viewport area? */
  inside: boolean;
  /** Above the viewport area? */
  above: boolean;
  /** Below the viewport area? */
  below: boolean;
  /** To the left of the viewport area? */
  left: boolean;
  /** To the right of the viewport area? */
  right: boolean;
}



/**
 * Determines whether the element is in the area of the viewport or not.
 *
 * @param elm - DOM element to test
 * @param threshold - The distance to the edge of the viewport before
 *                    the element is no longer inside in the viewport area,
 *                    in pixels
 *
 * @return An object with indications of where the element is compared to the viewport area
 *
 * @example
 *
 * ```ts
 * // Element inside viewport
 * const { inside } = inView(myElement);
 * // -> inside === true
 *
 * // Element outside viewport
 * const { inside, below } = inView(myElement);
 * // -> inside === false; below === true
 *
 * // With a threshold
 * const { inside } = inView(myElement, 30);
 * // -> inside === true
 * ```
 */
export default function inView(elm: HTMLElement, threshold = 0): PositionIndicator {
  const elmOk = isDOMChildNode(elm) && !hidden(elm);

  const rect = !!elmOk && elm.getBoundingClientRect();
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;

  const above = rect && rect.bottom - threshold <= 0;
  const below = rect && rect.top - vpHeight + threshold >= 0;
  const left = rect && rect.right - threshold <= 0;
  const right = rect && rect.left - vpWidth + threshold >= 0;
  const inside = !!rect && !above && !below && !left && !right;

  return { inside, above, below, left, right };
}
