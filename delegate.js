import isString from 'vanillajs-helpers/isString';
import isFunction from 'vanillajs-helpers/isFunction';

import isEventTarget from './isEventTarget';
import on from './on';
import matches from './matches';



/**
 * Creates a function that triggers the given handler if the current event target
 * matches the given delegation selector
 * @function delegateHandler
 * @param {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param {Funciton} handler - Handler to triger if delegation selector match
 * @return {Function|undefined} The delegate event handler
 */
export function delegateHandler(delegation, handler) {
  if (!isString(delegation) || !isFunction(handler)) { return; }

  return (e) => {
    let target = e.target;

    // The target matches the delegation selector, so execute the handler
    if (matches(target, delegation)) { return handler.call(target, e); }

    // Taget is a child of the delegation selector target, so loop up the parents
    // to find the right target
    if (matches(target, `${delegation} *`)) {
      target = target.parentElement;
      while (!matches(target, delegation)) { target = target.parentElement; }
      handler.call(target, e);
    }
  };
}


/**
 * Bind a delegated event handler for one or more event names on a DOM element.
 *
 * @function delegate
 * @param {HTMLElement} elm - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param {Function} handler - Handler to bind to the event
 * @return {Function} The delegation event handler (so it may be removed again)
 */
export default function delegate(target, eventNames, delegation, handler) {
  if (!isEventTarget(target)) {
    [target, eventNames, delegation, handler] = [document, target, eventNames, delegation];
  }

  const delHandler = delegateHandler(delegation, handler);
  if (delHandler) { on(target, eventNames, delHandler); }
  return delHandler;
}
