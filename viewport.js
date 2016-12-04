import isDOMDocument from './isDOMDocument';

/**
 * Get the current viewport element (scrolling element) of the current document
 * @param  {Document|Window|HTMLElement} [doc=document] - Element to find the viewport element from
 * @return {HTMLElement} - The viewport element
 */
export default function viewport(doc) {
  doc = doc || document;
  if(!isDOMDocument(doc)) {
    doc = doc.ownerDocument || doc.document;
    if(!doc) { return null; }
  }

  return doc.scrollingElement || (doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement);
}
