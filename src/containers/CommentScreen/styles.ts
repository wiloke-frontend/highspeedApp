import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerInput: {
    borderRadius: 10,
    flex: 1,
  },
  textInputView: {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  textInputButton: {
    flexShrink: 1,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 7,
    maxWidth: '85%',
  },
  txtBtn: { paddingVertical: 5, paddingHorizontal: 10 },
  ftModal: { top: 30, right: 0, zIndex: -1 },
  input: {
    borderRadius: 20,
    borderWidth: 1,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  userName: {
    marginHorizontal: 5,
  },
  inputAndroid: {
    padding: 7,
  },
});
export default styles;
