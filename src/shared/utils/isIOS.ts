import { Platform, PlatformIOSStatic } from 'react-native';
import { SCREEN_HEIGHT } from './screen';

const isIOS = Platform.OS === 'ios';

const PlatformIOS = Platform as PlatformIOSStatic;
export const isIpad = PlatformIOS.isPad;

export const isSmallDevice = SCREEN_HEIGHT < 700;

export default isIOS;
