import React, { ReactNode } from 'react';
import { Animated } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { View } from 'shared';

const setHeaderAnimation = (Component: ReactNode, safeAreaView = true) => {
  return ({ scene }: StackHeaderProps) => {
    const progress = Animated.add(scene.progress.current, scene.progress.next ?? 0);
    const opacity = progress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return (
      <View safeAreaView={safeAreaView}>
        <Animated.View style={{ opacity }}>{Component}</Animated.View>
      </View>
    );
  };
};

export default setHeaderAnimation;
