import isEventTarget from './isEventTarget';
import eventOptionsSupported from './eventOptionsSupported';



const _off = (
  elm: EventTarget,
  evt: string,
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions | boolean
) => elm.removeEventListener(evt, handler, options);



/**
 * Bind an event handler for one or more event names on a given DOM element.
 *
 * @param elm - DOM element to bind the event to
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'removeEventListener'
 * @return `elm`
 */
function off(
  elm: EventTarget,
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): EventTarget;

/**
 * Bind an event handler for one or more event names to `document`
 *
 * @param eventNames - Event names to bind the handler to
 * @param handler - Handler to bind to the event
 * @param options - Options to pass to the 'removeEventListener'
 * @return 
 */
function off(
  eventNames: string | string[],
  handler: EventListenerOrEventListenerObject,
  options?: EventListenerOptions
): EventTarget;



function off(
  elm: EventTarget | string | string[],
  eventNames: string | string[] | EventListenerOrEventListenerObject,
  handler?: EventListenerOrEventListenerObject | EventListenerOptions,
  options?: EventListenerOptions
): EventTarget {
  if (!isEventTarget(elm)) {
    options = handler as EventListenerOptions;
    handler = eventNames as EventListenerOrEventListenerObject;
    eventNames = elm;
    elm = document;
  }

  const opts: boolean | EventListenerOptions | undefined = 
    eventOptionsSupported()
      ? options
      : !!(options && options.capture);
  
  if (!Array.isArray(eventNames)) {
    eventNames = [eventNames as string];
  }

  eventNames.forEach(
    (evt) => _off(
      elm as EventTarget,
      evt,
      handler as EventListenerOrEventListenerObject,
      opts
    )
  );

  return elm;
}

export default off;


