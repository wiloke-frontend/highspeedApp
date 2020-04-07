import React, { ReactNode, memo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { Text } from 'shared/components/Text/Text';
import { View } from 'shared/components/View/View';
import styles from './styles';
import { useTheme } from '../ThemeContext/ThemeContext';
import getBorderRadiusStyle from 'shared/utils/getBorderRadiusStyle';
import getBorderWidthStyle from 'shared/utils/getBorderWidthStyle';
import { Color, BorderRadius, BorderWidth, Size } from 'shared/types/types';
import { tailwindStyles } from 'shared/themes/tailwind';
import { withViewStyles, WithViewStylesProps } from 'shared/hocs/withViewStyles';

export interface ButtonProps extends TouchableOpacityProps, WithViewStylesProps {
  children?: ReactNode;
  borderRadius?: BorderRadius;
  size?: Size;
  block?: boolean;
  backgroundColor?: Color;
  color?: Color;
  borderColor?: Color;
  borderWidth?: BorderWidth;
  loading?: boolean;
  loadingColor?: Color;
  LoadingComponent?: ReactNode;
}

function _getSizeStyle(size: Size) {
  switch (size) {
    case 'extra-small':
      return styles.extraSmall;
    case 'small':
      return styles.small;
    case 'medium':
      return styles.medium;
    case 'large':
      return styles.large;
    default:
      return {};
  }
}

function _getFontSizeStyle(size: Size) {
  if (size === 'large' || size === 'medium') {
    return tailwindStyles['text-sm'];
  }
  if (size === 'extra-small') {
    return tailwindStyles['text-xs'];
  }
  return {};
}

const TouchableOpacityWithStyles = withViewStyles(TouchableOpacity);

function ButtonComponent({
  children,
  borderRadius = 'default',
  size = 'medium',
  block = false,
  activeOpacity = 0.8,
  backgroundColor = 'primary',
  color = 'light',
  borderWidth = 1,
  borderColor = 'transparent',
  loading = false,
  loadingColor = 'light',
  LoadingComponent,
  style,
  ...otherProps
}: ButtonProps) {
  const { colors } = useTheme();
  const borderStyle = getBorderRadiusStyle(borderRadius);
  const sizeStyle = _getSizeStyle(size);
  const fontSizeStyle = _getFontSizeStyle(size);
  const blockStyle = block ? {} : tailwindStyles['flex-wrap'];
  const borderWidthStyle = getBorderWidthStyle(borderWidth);

  return (
    <View style={[blockStyle]}>
      <TouchableOpacityWithStyles
        {...otherProps}
        style={[
          styles.touchable,
          borderStyle,
          sizeStyle,
          borderWidthStyle,
          { backgroundColor: colors[backgroundColor], borderColor: colors[borderColor] },
          style,
        ]}
        activeOpacity={activeOpacity}
      >
        <View style={styles.inner}>
          {loading ? (
            LoadingComponent ?? <ActivityIndicator size="small" color={colors[loadingColor]} />
          ) : typeof children === 'string' ? (
            <Text color={color} tachyons="tc" style={fontSizeStyle}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </TouchableOpacityWithStyles>
    </View>
  );
}

export const Button = memo(ButtonComponent);
