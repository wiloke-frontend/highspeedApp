import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    top: -8,
    left: 10,
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
