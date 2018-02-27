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

  if(elm.scrollBy) {
    elm.scrollBy(x, y);
  } else {
    elm.scrollLeft = Math.max(elm.scrollLeft + x, 0);
    elm.scrollTop = Math.max(elm.scrollTop + y, 0);
  }

  return orgElm;
}
