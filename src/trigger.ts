import isEventTarget from './isEventTarget';



const customEvent = (name: string, data?: Record<string, unknown>) => {
  const options = { bubbles: true } as CustomEventInit;
  if (typeof data !== 'undefined') { options.detail = data; }
  return new CustomEvent(name, options);
};

const _trigger = (
  elm: EventTarget,
  eventNames: string | string[],
  data?: Record<string, unknown>
) => {
  if (!Array.isArray(eventNames)) {
    eventNames = [eventNames];
  }

  eventNames.forEach(
    (evt: string) => elm.dispatchEvent(customEvent(evt, data))
  );
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
  data?: Record<string, unknown>
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
  data?: Record<string, unknown>
): EventTarget



function trigger(
  elm: EventTarget | string | string[],
  eventNames?: string | string[] | Record<string, unknown>,
  data?: Record<string, unknown>
): EventTarget {
  if (!isEventTarget(elm)) {
    data = eventNames as Record<string, unknown>;
    eventNames = elm;
    elm = document;
  }

  _trigger(elm, eventNames as string | string[], data);
  return elm;
}

export default trigger;
