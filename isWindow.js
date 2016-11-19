export default function isWindow(obj) {
  return !!obj && typeof obj.self !== 'undefined' && obj.self === obj;
}
