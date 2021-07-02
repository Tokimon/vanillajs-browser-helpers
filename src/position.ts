import type { GeneralWindow } from './shared/types';

import isWindow from './isWindow';
import isDOMElement from './isDOMElement';
import isDocument from './isDocument';
import scrollInfo from './scrollInfo';
import size from './size';



interface Position {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface PositionData extends Position {
  /** Position relative to the offset parent */
  parent: Position;
  /** Position relative to the viewport area */
  viewport: Position;
}



const getWindowPosition = (win: GeneralWindow): Position => {
  const top = win.screenLeft || win.screenX || 0;
  const left = win.screenY || win.screenTop || 0;
  const right = win.screen.availWidth - left - win.outerWidth;
  const bottom = win.screen.availHeight - top - win.outerHeight;

  return { top, left, right, bottom };
};

const getElementPosition = (elm: HTMLElement): PositionData => {
  const rect = elm.getBoundingClientRect();
  const vpScroll = scrollInfo();
  const vpSize = size();
  const elmSize = size(elm);
  const parentSize = size(elm.offsetParent as HTMLElement || undefined);

  return {
    top: rect.top + vpScroll.y,
    left: rect.left + vpScroll.x,
    right: vpSize.width - rect.right - vpScroll.x,
    bottom: vpSize.height - rect.bottom - vpScroll.y,

    parent: {
      top: elm.offsetTop,
      left: elm.offsetLeft,
      right: parentSize.width - elm.offsetLeft - elmSize.width,
      bottom: parentSize.height - elm.offsetTop - elmSize.height
    },

    viewport: {
      top: rect.top,
      left: rect.left,
      right: vpSize.width - rect.right,
      bottom: vpSize.height - rect.bottom
    }
  };
};



/**
 * Get the current position of a DOM element, either relative to the offsetParent
 * or relative to the document. If the element is the viewport or the window, the
 * position of the window is returned.
 *
 * @param elm - The DOM element to find the position of
 * @param relative = false - Find the position relative to the offsetParent rather than the document
 * @return the position information of the element
 *
 * @example
 *
 * ```ts
 * // Get the position of the current window
 * position();
 *
 * // Get the position of the window of a given document
 * position(document);
 * position(document.documentElement);
 * position(document.body);
 *
 * // Get the position of a given element
 * position(someElement);
 * ```
 */
export default function position(elm?: HTMLElement | GeneralWindow | Document): Position | PositionData {
  let currElm: typeof elm | null = elm;

  // Fallback to document if the element is one of the root elements
  if (isDOMElement(currElm, ['html', 'body'])) { currElm = currElm.ownerDocument; }
  // Fallback to window if the element is Document
  if (isDocument(currElm)) { currElm = currElm.defaultView; }

  // If we have no element, fall back to window
  currElm = currElm || window;

  return isWindow(currElm)
    ? getWindowPosition(currElm)
    : getElementPosition(currElm as HTMLElement);
}
