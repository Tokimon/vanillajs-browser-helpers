import type { VoidFunction } from './shared/types';

import isEventTarget from './isEventTarget';
import on from './on';
import off from './off';
import matches from './matches';



interface DelegateEvent extends Event {
  delegateTarget: HTMLElement;
}



/**
 * Creates a function that triggers the given handler if the current event target
 * matches the given selector
 *
 * @param selector - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to trigger if selector selector match
 * @return The delegate event handler
 *
 * @example
 *
 * ```ts
 * const handler = delegateHandler('.my-element', (e: Event) => {});
 * document.addEventHandler('click', handler);
 * ```
 */
export function delegateHandler(
  selector: string,
  handler: EventListenerOrEventListenerObject
): EventListener {
  const cb = 'handleEvent' in handler
    ? handler.handleEvent
    : handler;

  return (e: Event) => {
    let target = e.target as HTMLElement;

    while (target && !matches(target, selector)) {
      const parent = target.parentElement;
      if (!parent) { return; }
      target = parent;
    }

    const evt = e as DelegateEvent;
    evt.delegateTarget = target;

    return cb.call(target, evt);
  };
}


/**
 * Bind a delegated event handler for one or more event names to document.
 *
 * @param eventNames - Event names to bind the handler to
 * @param selector - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to bind to the event
 * @return A function that removes the event selector handler again
 *
 * @example
 *
 * ```ts
 * // Bind to a single event
 * const removeDelegate = delegate('click', '.my-element', (e: Event) => {});
 *
 * // Bind to multiple events
 * const removeDelegates = delegate(['click', 'mouseenter'], '.my-element', (e: Event) => {});
 * ```
 */
function delegate(
  eventNames: string | string[],
  selector: string,
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): VoidFunction;

/**
 * Bind a delegated event handler for one or more event names to a DOM element.
 *
 * @param elm - DOM element to unbind the event from
 * @param eventNames - Event names to bind the handler to
 * @param selector - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to bind to the event
 * @return A function that removes the event selector handler again
 *
 * @example
 *
 * ```ts
 * // Bind to a single event
 * const removeDelegate = delegate(element, 'click', '.my-element', (e: Event) => {});
 *
 * // Bind to multiple events
 * const removeDelegates = delegate(element, ['click', 'mouseenter'], '.my-element', (e: Event) => {});
 * ```
 */
function delegate(
  target: EventTarget,
  eventNames: string | string[],
  selector: string,
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): VoidFunction;



function delegate(
  target: EventTarget | string | string[],
  eventNames: string | string[],
  selector: string | EventListenerOrEventListenerObject,
  handler?: EventListenerOrEventListenerObject | EventListenerOptions,
  options?: EventListenerOptions
): VoidFunction {
  if (!isEventTarget(target)) {
    options = handler as EventListenerOptions | undefined;
    handler = selector as EventListenerOrEventListenerObject;
    selector = eventNames as string;
    eventNames = target;
    target = document;
  }

  const delHandler = delegateHandler(
    selector as string,
    handler as EventListenerOrEventListenerObject
  );

  on(target, eventNames, delHandler, options);

  return () => off(target as EventTarget, eventNames, delHandler);
}

export default delegate;
