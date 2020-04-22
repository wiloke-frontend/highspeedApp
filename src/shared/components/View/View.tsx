import React, { ReactNode, forwardRef, memo } from 'react';
import { View as RNView, ViewProps as RNViewProps, ViewStyle, StyleProp } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Flex } from 'shared/types/types';
import getFlexStyle from 'shared/utils/getFlexStyle';
import { useMount } from 'shared/hooks/useMount';
import styles from './styles';
import { withViewStyles, WithViewStylesProps } from 'shared/hocs/withViewStyles';

export interface ViewProps extends RNViewProps, WithViewStylesProps {
  children?: ReactNode;
  flex?: Flex | boolean;
  safeAreaView?: boolean;
  safeAreaViewBottom?: boolean;
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
  onMount?: () => void;
}
const ViewWithStyles = withViewStyles<RNView, ViewProps>(RNView);
const ViewComponent = forwardRef<RNView, ViewProps>(
  ({ children, flex = false, safeAreaView = false, safeAreaViewBottom = false, shadow = false, style = {}, onMount, ...ortherProps }, ref) => {
    const insets = useSafeArea();
    const flexStyle = getFlexStyle(flex);
    const shadowStyle = shadow ? styles.shadow : {};
    useMount(() => {
      onMount?.();
    });
    return (
      <ViewWithStyles ref={ref} style={[shadowStyle, flexStyle, style]} {...ortherProps}>
        {safeAreaView && <RNView style={{ height: insets.top }} />}
        {children}
        {safeAreaViewBottom && <RNView style={{ height: insets.bottom }} />}
      </ViewWithStyles>
    );
  },
);
export const View = memo(ViewComponent);
