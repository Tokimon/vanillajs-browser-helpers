import boxModel from './boxModel';
import isWindow from './isWindow';
import viewport from './viewport';



interface Size {
  width: number,
  height: number
}



export const enum SizeType {
  /** Size including margins and borders */
  MARGIN_BOX = 'margin-box',
  /** Size including borders */
  OUTER = 'outer',
  /** Size excluding borders and margins */
  INNER = 'inner',
  /** Size of the content (scrollable area minus padding) */
  CONTENT_BOX = 'content-box',
  /** Size excluding borders, margins and paddin */
  CONTENT = 'content'
}



export function elmSize(elm: HTMLElement, type: SizeType): Size {
  const {
    offsetWidth,
    offsetHeight,
    clientWidth,
    clientHeight
  } = elm;

  if (type === SizeType.OUTER) {
    return { width: offsetWidth, height: offsetHeight };
  }

  if (type === SizeType.INNER) {
    return { width: clientWidth, height: clientHeight };
  }

  if (type === SizeType.MARGIN_BOX) {
    const { margin } = boxModel(elm);

    return {
      width: offsetWidth + margin.left + margin.right,
      height: offsetHeight + margin.top + margin.bottom
    };
  }

  if (type === SizeType.CONTENT_BOX) {
    const { padding } = boxModel(elm);

    return {
      width: clientWidth - padding.left - padding.right,
      height: clientHeight - padding.top - padding.bottom
    };
  }

  const { scrollWidth, scrollHeight } = elm;
  const { padding } = boxModel(elm);

  return {
    width: scrollWidth - padding.left,
    height: scrollHeight - padding.top
  };
}



export function windowSize(type: SizeType): Size {
  return type === SizeType.OUTER
    ? { width: window.outerWidth, height: window.outerHeight }
    : elmSize(viewport(), type);
}



/**
 * Find the size of a DOM element or the current Window.
 *
 * @param elm - The DOM element (or window) to find the size of
 * @param type - What type of size has to be computed. See `sizeType` for further details
 * @return Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // Get the outer size the window
 * size();
 *
 * // Get a specific size model of window
 * size(SizeType.MARGIN_BOX);
 * ```
 */
function size(type?: SizeType): Size

/**
 * Find the size of a DOM element or the current Window.
 *
 * @param elm - The DOM element (or window) to find the size of
 * @param type - What type of size has to be computed. See `sizeType` for further details
 * @return Object describing width and height of the element
 *
 * @example
 *
 * ```ts
 * // Get the outer size af given element
 * size(someElement);
 *
 * // Get a specific size model of a given element
 * size(someElement, SizeType.MARGIN_BOX);
 * ```
 */
function size(elm: HTMLElement | Window, type?: SizeType): Size;

function size(elm?: HTMLElement | Window | SizeType, type?: SizeType): Size {
  if (typeof elm === 'number') {
    type = elm;
    elm = window;
  }

  type = type ?? SizeType.OUTER;
  elm = elm || window;

  return isWindow(elm)
    ? windowSize(type)
    : elmSize(elm as HTMLElement, type);
}

export default size;



/**
 * Find the size of a DOM element or window including margins and borders
 *
 * @param elm - The DOM element (or window) to find the size of
 * @return Object describing width and height of the element
 */
export const marginBoxSize = (elm: HTMLElement | Window): Size => size(elm, SizeType.MARGIN_BOX);



/**
 * Find the size of a DOM element or window including borders
 *
 * @param elm - The DOM element (or window) to find the size of
 * @return Object describing width and height of the element
 */
export const outerSize = (elm: HTMLElement | Window): Size => size(elm, SizeType.OUTER);



/**
 * Find the size of a DOM element or window excluding borders and margins
 *
 * @param elm - The DOM element (or window) to find the size of
 * @return Object describing width and height of the element
 */
export const innerSize = (elm: HTMLElement | Window): Size => size(elm, SizeType.INNER);



/**
 * Find the size of the content (scrollable area minus padding) of a DOM element or window
 *
 * @param elm - The DOM element (or window) to find the size of
 * @return Object describing width and height of the element
 */
export const contentSize = (elm: HTMLElement | Window): Size => size(elm, SizeType.CONTENT);



/**
 * Find the size of a DOM element or window excluding borders, margins and padding
 *
 * @param elm - The DOM element (or window) to find the size of
 * @return Object describing width and height of the element
 */
export const contentBoxSize = (elm: HTMLElement | Window): Size => size(elm, SizeType.CONTENT_BOX);
