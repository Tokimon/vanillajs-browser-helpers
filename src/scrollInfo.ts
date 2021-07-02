import type { GeneralWindow } from './shared/types';

import viewport from './viewport';
import isWindow from './isWindow';



interface ScrollInfo {
  x: number;
  y: number;
  xMax: number;
  yMax: number;
  xPct: number;
  yPct: number;
}



/**
 * Gather the current scroll position information of a DOM element or the window
 *
 * @param elm - The element to find the scrolling position from
 * @return The scroll information
 */
export default function scrollInfo(elm: Element | GeneralWindow = window): ScrollInfo {
  const _elm = isWindow(elm)
    ? viewport(elm)
    : elm;

  const info = { x: 0, y: 0, xMax: 0, yMax: 0, xPct: 0, yPct: 0 };

  if (!_elm) { return info; }

  info.x = _elm.scrollLeft;
  info.y = _elm.scrollTop;

  info.xMax = Math.max(_elm.scrollWidth - _elm.clientWidth, 0);
  info.yMax = Math.max(_elm.scrollHeight - _elm.clientHeight, 0);

  if (info.xMax) { info.xPct = info.x / info.xMax; }
  if (info.yMax) { info.yPct = info.y / info.yMax; }

  return info;
}
