import isDOMDocument from './isDOMDocument';

export default function viewport(doc) {
  doc = doc || document;
  if(!isDOMDocument(doc)) {
    doc = doc.ownerDocument || doc.document;
    if(!doc) { return null; }
  }

  return doc.scrollingElement || (doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement)
}
