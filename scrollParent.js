import isDOMChildNode from './isDOMChildNode';



/**
 * Get the parent element that has scrolling
 * @param  {HTMLElement} elm - The element whose scroll parent is determined
 * @return {HTMLElement} The scroll parent or the viewport
 */
export default function scrollParent(elm) {
  const { body } = document;
  if (!isDOMChildNode(elm) || elm === body) { return null; }

  const { position: elmPosition } = getComputedStyle(elm);

  if (elmPosition === 'fixed') { return body; }

  const noStaticParent = elmPosition === 'absolute';
  let parent = elm.parentElement;

  while (parent && parent !== body) {
    const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);

    if (
      !(noStaticParent && position === 'static') &&
      /(auto|scroll)/.test(overflow + overflowY + overflowX)
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return body;
}
