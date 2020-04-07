import React, { memo, ReactNode } from 'react';
import styles from './styles';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import { Text } from 'shared/components/Text/Text';
import { View } from 'shared/components/View/View';

export interface FormmItemProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
  children: ReactNode;
}

function FormItemComponnent({ label = '', errorMessage = '', required = false, children }: FormmItemProps) {
  const { styled } = useTheme();
  return (
    <View style={styles.container}>
      {!!label && (
        <Text tachyons={['f6', 'mt1']} style={styled.colorDark3}>
          {label} {required && <Text style={styled.colorSecondary}>*</Text>}
        </Text>
      )}
      {children}
      {!!errorMessage && (
        <Text tachyons="f6" style={[styled.colorDanger, styles.error]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

export const FormItem = memo(FormItemComponnent);
