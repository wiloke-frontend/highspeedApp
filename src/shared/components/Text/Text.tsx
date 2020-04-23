import React, { memo, ReactNode, forwardRef } from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { withTextStyles, WithTextStylesProps } from 'shared/hocs/withTextStyles';
import { useTheme } from '../ThemeContext/ThemeContext';

export interface TextProps extends RNTextProps, WithTextStylesProps {
  children: ReactNode;
}

const styles = StyleSheet.create({
  debug: {
    borderWidth: 1,
    borderColor: '#eb2226',
  },
});

const TextWithStyles = withTextStyles(RNText);

const TextComponent = forwardRef<RNText, TextProps>(({ children, style, ...rest }, ref) => {
  const { debug } = useTheme();
  return (
    <TextWithStyles {...rest} style={[style, debug ? styles.debug : {}]} ref={ref}>
      {children}
    </TextWithStyles>
  );
});

export const Text = memo(TextComponent);
