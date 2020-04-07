import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export type AnimatedReturn = [Animated.Value, () => void];

export function useAnimated({
  toValue,
  duration = 200,
  useNativeDriver = true,
}: {
  toValue: number;
  duration?: number;
  useNativeDriver?: boolean;
}): AnimatedReturn {
  const animation = useRef(new Animated.Value(0));

  const onAnimated = useCallback(() => {
    Animated.timing(animation.current, {
      toValue,
      duration,
      useNativeDriver,
    }).start();
  }, [duration, toValue, useNativeDriver]);

  return [animation.current, onAnimated];
}
