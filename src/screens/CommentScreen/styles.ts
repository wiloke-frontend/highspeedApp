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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e7e7ed',
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
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#292929',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  tagList: {
    elevation: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d6da',
  },
  txtBtn: { paddingVertical: 5, paddingHorizontal: 10 },
  ftModal: { top: 30, right: 0, zIndex: -1 },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e7e7ed',
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
