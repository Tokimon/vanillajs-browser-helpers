/**
 * Is the given object a Document Fragment
 * 
 * @param obj - The object to check
 * @return Is it a Document Fragment or not
 */
export default function isDOMFragment(obj: any): obj is DocumentFragment {
  return obj instanceof DocumentFragment;
}
