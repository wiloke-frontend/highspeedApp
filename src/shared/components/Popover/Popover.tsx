import React, { ReactNode } from 'react';
import { Modal, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { useSwitchAnimation, PlacementType } from 'shared/hooks/useSwitchAnimation';
import { View } from 'shared/components/View/View';
import { styles } from './styles';
import { Appearance } from 'shared/types/types';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';

// import posed from 'react-native-pose';

export interface PopoverProps {
  appearance?: Appearance;
  placement?: PlacementType;
  children: ReactNode;
  Content: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// const AnimatedView = posed.View({
//   open: { opacity: 1, scale: 1, transition: { duration: 100 } },
//   closed: { opacity: 0, scale: 0.4, transition: { duration: 100 } },
// });

export function Popover({ children, Content, style = {}, placement = 'top', appearance = 'light' }: PopoverProps) {
  const { styled } = useTheme();
  const { buttonRef, contentRef, contentStyle, isVisible, onClose, onOpen } = useSwitchAnimation({
    placement,
    duration: 100,
  });

  const popoverInnerStyle: StyleProp<ViewStyle> = [styles.popoverInner, styles.shadow, appearance === 'light' ? styled.bgLight : styled.bgDark1];

  const popoverContentStyle: StyleProp<ViewStyle> = [styles.popoverOuter, contentStyle];

  return (
    <>
      <Modal visible={isVisible} animationType="fade" transparent onRequestClose={onClose}>
        <View ref={contentRef} style={popoverContentStyle}>
          <View style={popoverInnerStyle}>{Content}</View>
        </View>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.underlay} />
      </Modal>
      <TouchableOpacity ref={buttonRef} onPress={onOpen} style={style}>
        {children}
      </TouchableOpacity>
    </>
  );
}
