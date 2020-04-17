import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from 'shared/utils/screen';

export const styles = StyleSheet.create({
  imageBg: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    zIndex: -2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0.6,
    zIndex: -1,
  },
  logo: {
    width: '80%',
    height: 80,
  },
  wrapper: {
    position: 'relative',
    zIndex: 9,
    flex: 1,
  },
  content: {
    width: SCREEN_WIDTH - 20,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
  },
  error: {
    marginBottom: 4,
  },
  colorLight: {
    color: '#fff',
  },
});
