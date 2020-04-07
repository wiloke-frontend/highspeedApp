import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalInner: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'relative',
    zIndex: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 5,
    borderRadius: 18,
  },
  contentInner: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 15,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderLeftWidth: 1,
  },
});
