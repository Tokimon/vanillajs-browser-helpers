import isDOMChildNode from './isDOMChildNode';
import viewport from './viewport';



/**
 * Get the parent element that has scrolling
 *
 * @param elm - The element whose scroll parent is determined
 * @return The scroll parent or the viewport
 */
export default function scrollParent(elm: Element): Element | HTMLElement | null {
  const vp = viewport(elm);

  if (!isDOMChildNode(elm) || elm === vp) {
    return vp;
  }

  const { position: elmPosition } = getComputedStyle(elm);

  if (elmPosition === 'fixed') {
    return vp;
  }

  const noStaticParent = elmPosition === 'absolute';
  let parent: HTMLElement | null = elm.parentElement;

  while (parent && parent !== document.body) {
    const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);

    if (
      !(noStaticParent && position === 'static')
      && /(auto|scroll)/.test(overflow + overflowY + overflowX)
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return vp;
}
