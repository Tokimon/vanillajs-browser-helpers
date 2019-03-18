/**
 * Is the given object a Blob object
 * @function isBlob
 * @param {Object} obj - The object to check
 * @return {Boolean} Is it a Blob object or not
 */
export default function isBlob(obj) {
  return obj instanceof Blob;
}
