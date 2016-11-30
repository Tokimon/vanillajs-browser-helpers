import _on from './on';
import matches from './matches';
import isString from 'vanillajs-helpers/isString';
import isFunction from 'vanillajs-helpers/isFunction';



/**
 * Creates a function that triggers the given handler if the current event target
 * matches the given delegation selector
 * @param  {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param  {Funciton} handler - Handler to triger if delegation selector match
 * @return {Function} - The delegate event handler
 */
export function delegateHandler(delegation, handler) {
  if(!isString(delegation) || !isFunction(handler)) { return null; }

  return (e) => {
    let target = e.target;

    // The target matches the delegation selector, so execute the handler
    if(matches(target, delegation)) { return handler.call(target, e); }

    // Taget is a child of the delegation selector target, so loop up the parents
    // to find the right target
    if(matches(target, `${delegation} *`)) {
      target = target.parentElement;
      while(!matches(target, delegation)) { target = target.parentElement; }
      handler.call(target, e);
    }
  };
}


/**
 * Build an event binder that will bind delegated event handlers
 *
 * @param  {Function} on - The method to use bind event handlers
 * @param  {Function} off - The method to use to remove event handlers
 * @return {Function} - The delegate event binder
 */
export function delegateBuilder(on = _on) {
  if(!isFunction(on)) { return null; }

  return (elm, eventNames, delegation, handler) => {
    const delHandler = delegateHandler(delegation, handler);
    if(!delHandler) { return null; }

    on(elm, eventNames, delHandler);
    // We return the delegation handler so you might unbind it again
    return delHandler;
  };
}


/**
 * Bind a delegated event handler for one or more event names on a DOM element.
 *
 * @param  {HTMLElement} elm - DOM Element to unbind the event from
 * @param  {String|Array<String>} eventNames - Event names to bind the handler to
 * @param  {String} delegation - CSS Selector that matches the element to delegate the event to
 * @param  {Function} handler - Handler to bind to the event
 * @return {Function} - The delegation event handler (so it may be removed again)
 */
const delegate = delegateBuilder();
export default delegate;
