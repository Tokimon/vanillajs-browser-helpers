import _on from './on';
import matches from './matches';
import isString from './isString';
import isFunction from './isFunction';




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




export function delegateBuilder(on = _on) {
  if(!isFunction(on)) { return null; }

  return (elm, eventNames, delegation, handler) => {
    const delhandler = delegateHandler(delegation, handler);
    on(elm, eventNames, delhandler);
    // We return the delegation handler so you might unbind it again
    return delhandler;
  }
}




const delegate = delegateBuilder();
export default delegate;
