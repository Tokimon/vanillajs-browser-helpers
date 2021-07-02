import isEventTarget from './isEventTarget';



const customEvent = (name: string, data?: unknown) => {
  const options = { bubbles: true } as CustomEventInit;
  if (typeof data !== 'undefined') { options.detail = data; }
  return new CustomEvent(name, options);
};



/**
 * Trigger one or more events on a given DOM element.
 *
 * @param elm - DOM element to trigger the event on
 * @param eventNames - Event names to trigger
 * @param data - Extra data to add to the triggered event
 * @return The 'elm' (or document)
 */
function trigger(
  elm: EventTarget,
  eventNames: string | string[],
  data?: unknown
): EventTarget

/**
 * Trigger one or more events on Document.
 *
 * @param eventNames - Event names to trigger
 * @param data - Extra data to add to the triggered event
 * @return The 'elm' (or document)
 */
function trigger(
  eventNames: string | string[],
  data?: unknown
): EventTarget



function trigger(
  elm: EventTarget | string | string[],
  eventNames?: string | string[] | unknown,
  data?: unknown
): EventTarget {
  if (!isEventTarget(elm)) {
    data = eventNames as unknown;
    eventNames = elm;
    elm = document;
  }

  if (!Array.isArray(eventNames)) {
    eventNames = [eventNames];
  }

  (eventNames as string[]).forEach(
    (evt: string) => (elm as EventTarget).dispatchEvent(customEvent(evt, data))
  );
  return elm;
}

export default trigger;
