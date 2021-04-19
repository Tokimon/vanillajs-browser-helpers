import type { VoidFunction } from './shared/types';

import isEventTarget from './isEventTarget';
import eventOptionsSupported from './eventOptionsSupported';
import on from './on';
import off from './off';



type WhenFunction = (e: Event) => boolean;

export interface OnceEventListenerOptions extends AddEventListenerOptions {
  /** A function that returns a boolean to determine when the event should trigger */
  when?: WhenFunction
}



const manuelOnce = (
  elm: EventTarget,
  handler: EventListenerOrEventListenerObject,
  when?: WhenFunction
) => {
  const offHandler = (e: Event) => {
    if (when && when(e) !== true) { return true; }
    off(elm as EventTarget, e.type, offHandler);

    return 'handleEvent' in handler
      ? handler.handleEvent(e)
      : (handler as EventListener)(e);
  };

  return offHandler;
};

const bind = (
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: OnceEventListenerOptions
): VoidFunction => {
  const noOptions = !eventOptionsSupported();
  const { when, ...eventOptions } = options || {};
  eventOptions.once = !when;

  const eventHandler = when || noOptions
    ? manuelOnce(elm, handler, when)
    : handler;

  on(elm, eventNames, eventHandler, eventOptions);

  return () => off(elm, eventNames, eventHandler, eventOptions);
};



/**
 * Bind a single fire event handler for one or more event names on a DOM element.
 * (Add `when` to the options to conditional trigger the event)
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @return A function to remove the handler again
 */
function once(
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: OnceEventListenerOptions
): VoidFunction;

/**
 * Bind a single fire event handler for one or more event names on `document`.
 * (Add `when` to the options to conditional trigger the event)
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'addEventListener'
 * @return A function to remove the handler again
 */
function once(
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: OnceEventListenerOptions
): VoidFunction;



function once(
  elm: EventTarget | string | string[],
  eventNames: string | string[] | EventListenerOrEventListenerObject,
  handler?: EventListenerOrEventListenerObject | OnceEventListenerOptions,
  options?: OnceEventListenerOptions
): VoidFunction {
  if (!isEventTarget(elm)) {
    options = handler as OnceEventListenerOptions;
    handler = eventNames as EventListenerOrEventListenerObject;
    eventNames = elm;
    elm = document;
  }

  return bind(
    elm,
    eventNames as string | string[],
    handler as EventListenerOrEventListenerObject,
    options
  );
}

export default once;
