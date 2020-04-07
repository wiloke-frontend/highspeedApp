function spreadPropStype<T>(style: T): T[] {
  return Array.isArray(style) ? style : [style];
}

export default spreadPropStype;
