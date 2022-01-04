import insertAfter from './insertAfter';

function findEmptyElm(elm?: Element | null): Element | null | undefined {
  const child = elm?.firstElementChild;
  return child ? findEmptyElm(child) : elm;
}

export default (elm: Element, html: string) => {
  if (html) {
    const wrapElm = findEmptyElm(insertAfter(elm, html));
    wrapElm?.appendChild(elm);
  }

  return elm;
};
