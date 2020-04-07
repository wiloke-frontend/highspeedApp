import { useEffect, useRef } from 'react';

export default function isFunction<T>(fn: T) {
  return fn && typeof fn === 'function';
}
export const usePrevious = <T extends unknown>(state: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};
