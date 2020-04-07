import { TextStyle } from 'react-native';
import isIOS from 'shared/utils/isIOS';

export const fontWeightTitle: TextStyle = isIOS ? { fontWeight: '500' } : { fontFamily: 'sans-serif-medium', fontWeight: 'normal' };
export const fontWeightText: TextStyle = isIOS ? { fontWeight: '400' } : { fontFamily: 'sans-serif', fontWeight: 'normal' };
