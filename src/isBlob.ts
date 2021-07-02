/**
 * Is the given object a Blob object
 *
 * @param obj - The object to check
 * @return Is it a Blob object or not
 */
export default function isBlob(obj: unknown): obj is Blob {
  return obj instanceof Blob;
}
