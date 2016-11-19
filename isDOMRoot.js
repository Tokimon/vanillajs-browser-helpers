import inDOM from './inDOM';

export default function isDOMRoot(elm) {
  return inDOM(elm) && !elm.parentElement;
}
