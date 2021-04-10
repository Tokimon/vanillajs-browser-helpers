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
 * Gather the current scrolling information of a DOM/Window element
 * 
 * @param elm - The element to find the scrolling position from
 * @return The scroll information
 */
export default function scroll(elm: Element | Window = window): ScrollInfo {
  if (isWindow(elm)) {
    elm = viewport(elm);
  }

  const x = elm.scrollLeft;
  const y = elm.scrollTop;

  const xMax = Math.max(elm.scrollWidth - elm.clientWidth, 0);
  const yMax = Math.max(elm.scrollHeight - elm.clientHeight, 0);

  const xPct = xMax ? x / xMax : 0;
  const yPct = yMax ? y / yMax : 0;

  return { x, y, xMax, yMax, xPct, yPct };
}
