import React, { memo, ReactNode, forwardRef } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { withTextStyles, WithTextStylesProps } from 'shared/hocs/withTextStyles';

export interface TextProps extends RNTextProps, WithTextStylesProps {
  children: ReactNode;
}

const TextWithStyles = withTextStyles(RNText);

const TextComponent = forwardRef<RNText, TextProps>(({ children, ...rest }, ref) => {
  return (
    <TextWithStyles {...rest} ref={ref}>
      {children}
    </TextWithStyles>
  );
});

export const Text = memo(TextComponent);
