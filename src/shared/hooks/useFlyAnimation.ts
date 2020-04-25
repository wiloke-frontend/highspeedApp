import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

type RangeType = number[];

interface Coordinates {
  x: number;
  y: number;
}

export interface FlyAnimation {
  coordinates: Coordinates[];
  duration: number;
}

const VALUE = 100;

function getInputRange(outputRange: RangeType) {
  return outputRange.map((_item, index: number) => {
    return (VALUE * index) / (outputRange.length - 1);
  });
}

export function useFlyAnimation({ coordinates, duration }: FlyAnimation) {
  const anim = useRef(new Animated.Value(0));
  const outputRangeX = [...new Set(coordinates.map(item => item.x))];
  const outputRangeY = [...new Set(coordinates.map(item => item.y))];

  const onFly = useCallback(() => {
    Animated.timing(anim.current, {
      toValue: VALUE,
      duration,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  const inputRangeX = getInputRange(outputRangeX);

  const inputRangeY = getInputRange(outputRangeY);

  const animatedX = anim.current.interpolate({
    inputRange: inputRangeX,
    outputRange: outputRangeX,
    extrapolate: 'clamp',
  });

  const animatedY = anim.current.interpolate({
    inputRange: inputRangeY,
    outputRange: outputRangeY,
    extrapolate: 'clamp',
  });

  return { animatedX, animatedY, onFly };
}
