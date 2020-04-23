import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    top: -1,
    left: 0,
    height: 2,
    width: '100%',
  },
  icon: {
    marginBottom: -1,
  },
  label: {
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 10,
  },
  badge: {
    position: 'absolute',
    top: 3,
    left: 12,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
