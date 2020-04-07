import React, { useState, ReactNode } from 'react';
import { View } from 'shared';
import { usePortalAnimation, PortalAnimationParams } from 'shared/hooks/usePortalAnimation';
import { Easing, Animated, LayoutChangeEvent } from 'react-native';

export interface PopoverProps {
  animationType?: PortalAnimationParams['animationType'];
  animationDuration?: number;
  animmationEasing?: PortalAnimationParams['animmationEasing'];
  PopoverComponent: ReactNode;
  renderElementChange: (open: Function, close: Function) => ReactNode;
}

const Popover = ({
  animationType = 'fade',
  animationDuration = 200,
  animmationEasing = Easing.linear,
  PopoverComponent,
  renderElementChange,
}: PopoverProps) => {
  const elementHeight = 200;
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const { visibleState, animationStyle } = usePortalAnimation({
    visible,
    elementHeight,
    animationType,
    animmationEasing,
    animationDuration,
  });

  const showPopup = () => {
    setVisible(true);
  };

  const closePopup = () => {
    setVisible(false);
  };

  return (
    <View style={{ position: 'relative' }}>
      {visibleState && (
        <Animated.View
          style={[
            animationStyle,
            {
              top: -height - 10,
              position: 'absolute',
            },
          ]}
          onLayout={(event: LayoutChangeEvent) => setHeight(event.nativeEvent.layout.height)}
        >
          {PopoverComponent}
        </Animated.View>
      )}
      {renderElementChange(showPopup, closePopup)}
    </View>
  );
};

export default Popover;
