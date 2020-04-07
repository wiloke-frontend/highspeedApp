import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  placeholder: {
    zIndex: 9,
  },
  imageBg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    zIndex: -1,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  iconWrap: {
    position: 'relative',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default styles;
