import { GeneralWindow } from '../../shared/types';



export const generateId = (baseId: string): string => baseId + '__' + Date.now().toString(36);

export const byId = (id: string, doc: Document = document): HTMLElement => doc.getElementById(id) as HTMLElement;

export const getOne = (
  query: string,
  elm: Element | Document = document
): Element => elm.querySelector(query) as Element;

export const removeElement = (child: string | Element | HTMLElement | null, doc: Document = document): void => {
  if (typeof child === 'string') {
    child = byId(child, doc);
  }

  child && child.remove();
};

export const createElement = (tagName: string, doc = document): HTMLElement => doc.createElement(tagName);

export const createDetachedDocument = (): typeof document => document.implementation.createHTMLDocument();

export const appendFrame = (doc = document): HTMLIFrameElement => {
  const frame = createElement('iframe') as HTMLIFrameElement;
  frame.src = 'about:blank';

  doc.body.append(frame);

  return frame;
};

export const insertHtml = (
  html: string,
  elm: Element = document.body
): void => elm.insertAdjacentHTML('beforeend', html);

export const triggerEvent = (
  eventName: string,
  elm: Element | Document | GeneralWindow = document
): boolean =>
  elm.dispatchEvent(new CustomEvent(eventName, { bubbles: true }));

export const bind = (
  elm: EventTarget,
  evt: string,
  handler: EventListener
): void =>
  elm.addEventListener(evt, handler);

export const unbind = (
  elm: EventTarget,
  evt: string,
  handler: EventListener
): void =>
  elm.removeEventListener(evt, handler);
