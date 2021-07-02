import type { GeneralWindow } from './shared/types';

import getCurrentDocument from './getCurrentDocument';
import isWindow from './isWindow';



export default function getCurrentWindow(obj: unknown): null | GeneralWindow {
  if (isWindow(obj)) { return obj; }

  const doc = getCurrentDocument(obj);
  return doc && doc.defaultView;
}
