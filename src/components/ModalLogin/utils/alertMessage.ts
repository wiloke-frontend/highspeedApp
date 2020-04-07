import { Alert } from 'react-native';
import i18n from 'utils/functions/i18n';

function alertMessage(message: string) {
  Alert.alert(
    i18n.t('warning'),
    message,
    [
      {
        text: i18n.t('ok'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
}

function alertMessageWithOption(title: string, message: string, onPress: () => void) {
  Alert.alert(
    title,
    message,
    [
      {
        text: i18n.t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: i18n.t('login'),
        onPress,
      },
    ],
    { cancelable: false },
  );
}

export { alertMessage, alertMessageWithOption };
