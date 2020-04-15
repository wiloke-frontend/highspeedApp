import React, { useState, memo } from 'react';
import { Keyboard, LayoutAnimation, Platform, KeyboardEvent, LayoutAnimationConfig, EmitterSubscription, StatusBar } from 'react-native';
import { View, useUnmount, useMount } from 'shared';
import styles from './styles';
import { SCREEN_HEIGHT } from 'shared/utils/screen';

export interface KeyboardSpacerProps {
  topSpacing?: number;
  onToggle?: (toggle: boolean, space: number) => void;
}

const ANDROID = Platform.OS === 'android';

const defaultAnimation: LayoutAnimationConfig = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

let keyboardDidShowListener: EmitterSubscription;
let keyboardDidHideListener: EmitterSubscription;

const updateListener = ANDROID ? 'keyboardDidShow' : 'keyboardWillShow';
const resetListener = ANDROID ? 'keyboardDidHide' : 'keyboardWillHide';

function KeyboardSpacer({ topSpacing = 0, onToggle }: KeyboardSpacerProps) {
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [_, setKeyboardOpened] = useState(false);

  const _updateKeyboardSpace = (event: KeyboardEvent) => {
    StatusBar.setBarStyle('dark-content');
    if (!event.endCoordinates) {
      return;
    }
    let animationConfig = defaultAnimation;
    if (!ANDROID) {
      animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity);
    }
    LayoutAnimation.configureNext(animationConfig);
    const keyboardSpace2 = SCREEN_HEIGHT - event.endCoordinates.screenY;
    setKeyboardSpace(keyboardSpace2);
    setKeyboardOpened(true);
    onToggle?.(true, keyboardSpace2);
  };

  const _resetKeyboardSpace = (event: KeyboardEvent) => {
    let animationConfig = defaultAnimation;
    if (!ANDROID) {
      animationConfig = LayoutAnimation.create(event.duration, LayoutAnimation.Types[event.easing], LayoutAnimation.Properties.opacity);
    }
    LayoutAnimation.configureNext(animationConfig);
    setKeyboardSpace(0);
    setKeyboardOpened(false);
    onToggle?.(false, 0);
  };

  useMount(() => {
    keyboardDidShowListener = Keyboard.addListener(updateListener, _updateKeyboardSpace);
    keyboardDidHideListener = Keyboard.addListener(resetListener, _resetKeyboardSpace);
  });

  useUnmount(() => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  });

  return <View style={[styles.container, { height: keyboardSpace + topSpacing }]} />;
}
export default memo(KeyboardSpacer);
