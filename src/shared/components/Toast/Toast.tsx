import React, { useState, useRef, ReactNode, memo } from 'react';
import { View } from '../View/View';
import { Text } from '../Text/Text';
import Emitter from 'shared/utils/emitter';
import { useMount } from 'shared/hooks/useMount';
import { useUnmount } from 'shared/hooks/useUnmount';
import { styles } from './styles';
import { StyleProp, ViewStyle, Easing, Animated, LayoutChangeEvent } from 'react-native';
import { usePortalAnimation, AnimationType } from 'shared/hooks/usePortalAnimation';
import { Tailwind, Tachyons } from 'shared/types/types';
import { tachyonsStyles } from 'shared/themes/tachyons';

export type ToastPlacement = 'top' | 'center' | 'bottom';

export interface ToastUIState {
  visible: boolean;
  content: ReactNode;
  style: StyleProp<ViewStyle>;
  placement: ToastPlacement;
  animationType: AnimationType;
  tailwind: Tailwind;
  tachyons: Tachyons;
}

export interface ToastShowPayload {
  content: ReactNode;
  duration?: number;
  placement?: ToastPlacement;
  style?: StyleProp<ViewStyle>;
  animationType?: AnimationType;
  tailwind?: Tailwind;
  tachyons?: Tachyons;
  onOpenEnd?: () => void;
  onCloseEnd?: () => void;
}

export type ToastShowParams = ToastShowPayload | string;

const ToastEvent = new Emitter();

const defaultPayload: ToastShowPayload = {
  duration: 2000,
  content: '',
  style: {},
  placement: 'bottom',
  animationType: 'fade',
};

const defaultState: ToastUIState = {
  visible: false,
  content: '',
  style: {},
  placement: 'bottom',
  animationType: 'fade',
  tailwind: [],
  tachyons: [],
};

const getPlacementStyle = (placement: ToastPlacement, height: number): ViewStyle => {
  switch (placement) {
    case 'top':
      return {
        top: 10,
      };
    case 'center':
      return {
        top: '50%',
        marginTop: !!height ? -height / 2 : 0,
      };
    case 'bottom':
      return {
        bottom: 10,
      };
    default:
      return {};
  }
};

export const Toast = {
  show(payload: ToastShowParams) {
    const _payload: ToastShowPayload = {
      ...defaultPayload,
      ...(typeof payload === 'string' ? { content: payload } : payload),
    };
    ToastEvent.emit('TOAST_SHOW', _payload);
  },
};

export const ToastUI = memo(() => {
  const [visible, setVisible] = useState(defaultState.visible);
  const [content, setContent] = useState(defaultState.content);
  const [style, setStyle] = useState(defaultState.style);
  const [placement, setPlacement] = useState(defaultState.placement);
  const [animationType, setAnimationType] = useState(defaultState.animationType);
  const [tailwind, setTailwind] = useState(defaultState.tailwind);
  const [tachyons, setTachyons] = useState(defaultState.tachyons);
  const [height, setHeight] = useState(0);
  const show = useRef(0);
  const timeout = useRef(0);
  const { visibleState, animationStyle } = usePortalAnimation({
    visible,
    animationType,
    animationDuration: 200,
    animmationEasing: Easing.bezier(0.46, 0.79, 0.54, 0.98),
    elementHeight: height,
  });

  const handleLayoutContainer = (event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height);
  };

  const handleShow = (payload: ToastShowPayload) => {
    setVisible(true);
    setContent(payload.content);
    setStyle(payload.style);
    !!payload.placement && setPlacement(payload.placement);
    !!payload.animationType && setAnimationType(payload.animationType);
    !!payload.tailwind && setTailwind(payload.tailwind);
    !!payload.tachyons && setTachyons(payload.tachyons);
    payload.onOpenEnd?.();
    timeout.current = setTimeout(() => {
      setVisible(false);
      payload.onCloseEnd?.();
      clearTimeout(timeout.current);
    }, payload.duration);
  };

  useMount(() => {
    if (!visible) {
      show.current = ToastEvent.on('TOAST_SHOW', handleShow);
    }
  });

  useUnmount(() => {
    ToastEvent.off(show.current);
    clearTimeout(timeout.current);
  });

  if (!visibleState) {
    return null;
  }

  return (
    <View style={[styles.container, getPlacementStyle(placement, height)]} onLayout={handleLayoutContainer}>
      <View safeAreaView>
        <Animated.View style={[tachyonsStyles.flex, animationStyle]}>
          <View style={[styles.toastInner, style]} tailwind={tailwind} tachyons={tachyons} backgroundColor="dark1">
            {typeof content === 'string' ? <Text color="gray1">{content}</Text> : content}
          </View>
        </Animated.View>
      </View>
    </View>
  );
});
