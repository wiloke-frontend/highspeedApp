import React, { memo } from 'react';
import { ViewStyle } from 'react-native';
import SyntaxHighlighter, { Language } from 'react-native-syntax-highlighter';
import atomDark from './atomDark';
import styles from './styles';

export interface CodeHighLightProps {
  language?: Language;
  children: string;
  containerStyle?: ViewStyle;
}

function CodeHighLight({ children, language = 'jsx', containerStyle = {}, ...rest }: CodeHighLightProps) {
  return (
    <SyntaxHighlighter
      {...rest}
      style={atomDark}
      customStyle={{
        ...styles.container,
        ...containerStyle,
      }}
      language={language}
      fontSize={14}
      highlighter="prism"
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default memo(CodeHighLight);
