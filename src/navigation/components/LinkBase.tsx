import React, { ReactNode, useCallback } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { withNavigation, NavigationParams, NavigationInjectedProps } from 'react-navigation';
import { withViewStyles, WithViewStylesProps } from 'shared';
import { NavigationStackProp } from 'react-navigation-stack';

export interface LinkBaseProps extends WithViewStylesProps {
  children?: ReactNode;
  to?: string;
  push?: string;
  params?: NavigationParams;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  navigation?: NavigationStackProp;
  onBeforeNavigate?: () => void;
  onAfterNavigate?: () => void;
}

function LinkBase({
  children,
  activeOpacity = 1,
  style = {},
  to,
  params,
  navigation,
  push,
  onBeforeNavigate,
  onAfterNavigate,
}: LinkBaseProps & NavigationInjectedProps) {
  const _handlePress = useCallback(() => {
    onBeforeNavigate?.();
    if (!!push) {
      navigation?.push?.(push, params);
    } else {
      if (to === '../') {
        navigation.goBack();
      } else if (!!to) {
        navigation.navigate(to, params);
      }
    }
    onAfterNavigate?.();
  }, [navigation, onAfterNavigate, onBeforeNavigate, params, push, to]);

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={_handlePress} style={style}>
      {children}
    </TouchableOpacity>
  );
}

export default withNavigation(withViewStyles(LinkBase));
