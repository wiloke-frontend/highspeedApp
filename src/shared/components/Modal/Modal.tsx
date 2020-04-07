import React, { FC } from 'react';
import { Animated, Easing } from 'react-native';
import { View } from 'shared';
import { ModalBase, ModalBaseProps } from '../ModalBase/ModalBase';
import { usePortalAnimation, PortalAnimationParams } from 'shared/hooks/usePortalAnimation';
import { tailwindStyles } from 'shared/themes/tailwind';

export interface ModalProps extends ModalBaseProps {
  animationType?: PortalAnimationParams['animationType'];
  animationDuration?: number;
  animmationEasing?: PortalAnimationParams['animmationEasing'];
}

export const Modal: FC<ModalProps> = ({
  children,
  visible = false,
  style,
  animationType = 'none',
  animationDuration = 400,
  animmationEasing = Easing.bezier(0.46, 0.79, 0.54, 0.98),
  ...otherProps
}) => {
  const { visibleState, animationStyle } = usePortalAnimation({ visible, animationType, animationDuration, animmationEasing });

  return (
    <ModalBase visible={visibleState} {...otherProps}>
      <Animated.View style={[tailwindStyles['flex-1'], animationStyle]}>
        <View flex style={style}>
          {children}
        </View>
      </Animated.View>
    </ModalBase>
  );
};
