export type CSSStyleKey = Exclude<
  Exclude<keyof CSSStyleDeclaration, number>,
  'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'length' | 'parentRule'
>;

export type CSSStyleProperties = Partial<Record<CSSStyleKey, string | number | null>>;

export type VoidFunction = () => void;

export type GeneralWindow = Window | typeof window;
