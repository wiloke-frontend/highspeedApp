import { Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

export const sizeBase = 14;

export const isIphoneX = () => {
  const { width, height } = Dimensions.get('window');
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812 || height === 896 || width === 896);
};

export const bottomBarHeight = isIphoneX() ? 23 : 0;

export const statusBarHeight = Constants.statusBarHeight;

export const lights = {
  dark1: '#111111',
  dark2: '#444444',
  dark3: '#888888',
  dark4: '#cccccc',
  gray1: '#d6d6da',
  gray2: '#e7e7ed',
  gray3: '#f0f0f3',
  gray4: '#fafafb',
  gray5: '#fbfbfc',
  light: '#ffffff',
};

export const darks = {
  dark1: '#F0F0F0',
  dark2: '#E1E1E1',
  dark3: '#8A8A8A',
  dark4: '#4F4F4F',
  gray1: '#474742',
  gray2: '#383833',
  gray3: '#30302D',
  gray4: '#282827',
  gray5: '#272726',
  light: '#242424',
};

// export const darks = {
//   dark1: '#F1F1F1',
//   dark2: '#E0E0E0',
//   dark3: '#8F8F8F',
//   dark4: '#595959',
//   gray1: '#51514E',
//   gray2: '#44443F',
//   gray3: '#3C3C3A',
//   gray4: '#343434',
//   gray5: '#343433',
//   light: '#313131',
// };
