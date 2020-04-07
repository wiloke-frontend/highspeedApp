import { ViewStyle } from 'react-native';
import { Component } from 'react';

export type Language = 'css' | 'scss' | 'js' | 'jsx' | 'tsx' | 'php' | 'go' | 'java' | 'python' | 'typescript' | 'c' | 'cpp';

export interface SyntaxHighlighterProps {
  style: {
    'code[class*="language-"]': any;
    'pre[class*="language-"]': any;
    [key: string]: any;
  };
  customStyle: ViewStyle;
  language: Language;
  fontSize: number;
  highlighter: 'prism';
}

export default class SyntaxHighlighter extends Component<SyntaxHighlighterProps> {}
