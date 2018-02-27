import isDOMChildNode from './isDOMChildNode';
import isNumber from './isNumber';



/**
 * Gather the current scrolling information of a DOM/Window element
 * @function scroll
 * @param {HTMLElement|window} [elm = window] - The element to find the scrolling position from
 * @return {HTMLElement|window} The scrolling element (if no element was given Window is returned)
 */
export default function scrollTo(elm, x, y) {
  if(isNumber(elm)) { [elm, x, y] = [window, elm, x]; }
  if(!isNumber(x)) { return elm; }

  const orgElm = elm;
  if(!isDOMChildNode(elm)) { elm = window; }
  if(!isNumber(y)) { y = elm.scrollY || elm.scrollTop; }

  x = Math.max(x, 0);
  y = Math.max(y, 0);

  if(elm.scrollTo) {
    elm.scrollTo(x, y);
  } else {
    elm.scrollLeft = x;
    elm.scrollTop = y;
  }

  return orgElm;
}
