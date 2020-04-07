import React, { ReactNode, useCallback } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { withNavigation, NavigationParams, NavigationAction, NavigationInjectedProps } from 'react-navigation';
import { RouteNameType } from 'types/routeNameType';
import { withViewStyles, WithViewStylesProps } from 'shared';

export interface LinkProps extends WithViewStylesProps {
  children?: ReactNode;
  to?: RouteNameType | '../';
  push?: RouteNameType;
  params?: NavigationParams;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  navigation?: NavigationInjectedProps['navigation'] & {
    push?: (routeNameOrOptions: string, params?: NavigationParams, action?: NavigationAction) => boolean;
  };
  onBeforeNavigate?: () => void;
  onAfterNavigate?: () => void;
}

function Link({
  children,
  activeOpacity = 1,
  style = {},
  to,
  params,
  navigation,
  push,
  onBeforeNavigate,
  onAfterNavigate,
}: LinkProps & NavigationInjectedProps) {
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

export default withNavigation(withViewStyles(Link));
