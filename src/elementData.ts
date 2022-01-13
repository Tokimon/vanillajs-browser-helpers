let _cache = new WeakMap();

export const resetCache = () => { _cache = new WeakMap(); };

export default function elmData(elm: Node, key?: string, data?: unknown) {
  let elmCache = _cache.get(elm);

  if (!key) { return elmCache; }

  if (data !== undefined) {
    if (!elmCache) {
      elmCache = {};
      _cache.set(elm, elmCache);
    }

    elmCache[key] = data;
  }

  return elmCache?.[key];
}
