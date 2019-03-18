import viewport from './viewport';
import isDOMChildNode from './isDOMChildNode';

export default function scrollParent(elm) {
  const { position: elmPosition } = getComputedStyle(elm);

  if(isDOMChildNode(elm) && elmPosition !== 'fixed') {
    const noStaticParent = elmPosition === 'absolute';
    let parent = elm;

    while(parent && parent !== document.body) {
      const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);

      if(
        !(noStaticParent && position === 'static') &&
        /(auto|scroll)/.test(overflow + overflowY + overflowX)
      ) {
        return parent;
      }

      parent = parent.parentElement;
    }
  }

  return viewport();
}
