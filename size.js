import viewport from './viewport';
import isWindow from './isWindow';
import isDOMRoot from './isDOMRoot';
import isDOMDocument from './isDOMDocument';

/**
 * Finds the size of a HTML Element or window.
 * @param  {HTMLElement|window} [elm = viewport] - The HTML element (or window) to find the size of
 * @return {Object} - Object describing the various sizes of an element
 */
export default function size(elm) {
  if(isDOMDocument(elm)) { elm = elm.documentElement; }

  const isRoot = isDOMRoot(elm);
  const isWin = isWindow(elm);
  const win = isWin ? elm : elm.ownerDocument.defaultView;
  const view = isRoot ? viewport(elm) : elm;

  return {
    width: !isRoot ? elm.offsetWidth : win[`${isWin ? 'outer' : 'inner'}Width`],
    height: !isRoot ? elm.offsetHeight : win[`${isWin ? 'outer' : 'inner'}Height`],
    innerWidth: !isWin ? elm[`${!isRoot ? 'client' : 'offset'}Width`] : win.innerWidth,
    innerHeight: !isWin ? elm[`${!isRoot ? 'client' : 'offset'}Height`] : win.innerHeight,
    contentWidth: view.scrollWidth,
    contentHeight: view.scrollHeight
  };
}
