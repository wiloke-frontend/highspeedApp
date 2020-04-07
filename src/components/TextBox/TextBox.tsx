import React, { memo, ReactNode } from 'react';
import { View, Text, useTheme } from 'shared';
import styles from './styles';

interface TextBoxProps {
  children: ReactNode;
}

function TextBox({ children }: TextBoxProps) {
  const { styled } = useTheme();

  return (
    <View style={[styles.container, styled.bgLight, styled.bGray2]}>
      <Text type="h6">{children}</Text>
    </View>
  );
}

export default memo(TextBox);
