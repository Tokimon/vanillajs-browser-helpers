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
 * matches the given delegation selector
 *
 * @param delegation - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to trigger if delegation selector match
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
  delegation: string,
  handler: EventListenerOrEventListenerObject
): EventListener {
  return (e: Event) => {
    let target = e.target as HTMLElement;

    while (!matches(target, delegation)) {
      const parent = target.parentElement;
      if (parent) { target = parent; }
    }

    const evt = e as DelegateEvent;
    evt.delegateTarget = target;

    return 'handleEvent' in handler
      ? handler.handleEvent(evt)
      : handler.call(target, evt);
  };
}


/**
 * Bind a delegated event handler for one or more event names to document.
 *
 * @param eventNames - Event names to bind the handler to
 * @param delegation - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to bind to the event
 * @return A function that removes the event delegation handler again
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
  delegation: string,
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): VoidFunction;

/**
 * Bind a delegated event handler for one or more event names to a DOM element.
 *
 * @param elm - DOM element to unbind the event from
 * @param eventNames - Event names to bind the handler to
 * @param delegation - CSS Selector that matches the element to delegate the event to
 * @param handler - Handler to bind to the event
 * @return A function that removes the event delegation handler again
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
  delegation: string,
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): VoidFunction;



function delegate(
  target: EventTarget | string | string[],
  eventNames: string | string[],
  delegation: string | EventListenerOrEventListenerObject,
  handler?: EventListenerOrEventListenerObject | EventListenerOptions,
  options?: EventListenerOptions
): VoidFunction {
  if (!isEventTarget(target)) {
    options = handler as EventListenerOptions | undefined;
    handler = delegation as EventListenerOrEventListenerObject;
    delegation = eventNames as string;
    eventNames = target;
    target = document;
  }

  const delHandler = delegateHandler(
    delegation as string,
    handler as EventListenerOrEventListenerObject
  );

  on(target, eventNames, delHandler, options);

  return () => off(target as EventTarget, eventNames, delHandler);
}

export default delegate;
