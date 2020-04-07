import React, { FC, memo, useState } from 'react';
import { Modal, Linking, Image as RNImage, TouchableOpacity as RNTouchableOpacity } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { useMount, Button, View, Text, withViewStyles, Icons } from 'shared';
import Constants from 'expo-constants';
import isIOS from 'shared/utils/isIOS';

export interface ModalAppUpdateProps {
  text: string;
  buttonUpdateText: string;
  moreText: string;
}

const Image = withViewStyles(RNImage);
const TouchableOpacity = withViewStyles(RNTouchableOpacity);

const ModalAppUpdate: FC<ModalAppUpdateProps> = ({ text, buttonUpdateText, moreText }) => {
  const [storeUrl, setStoreUrl] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const appName = Constants.manifest.name;

  const handleNeedUpdate = async () => {
    try {
      const res = await VersionCheck.needUpdate();
      if (!!res?.isNeeded) {
        setStoreUrl(res.storeUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVersionCheck = async () => {
    try {
      await VersionCheck.getCountry();
      const currentVersion = VersionCheck.getCurrentVersion();
      setCurrentVersion(currentVersion);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    Linking.openURL(storeUrl);
  };

  useMount(() => {
    if (!__DEV__) {
      handleNeedUpdate();
      handleVersionCheck();
    }
  });

  return (
    <Modal visible={!!storeUrl}>
      <View tachyons={['flex', 'justifyCenter', 'pa3']}>
        <View tachyons={['itemsCenter']}>
          <Text type="h3" tachyons="mb3" color="primary">
            {appName} {currentVersion}
          </Text>
          <Text tachyons="tc">{text}</Text>
        </View>
        <Image source={require('assets/vectors/update.jpg')} tachyons={['w100', 'h50']} resizeMode="contain" />
        <Button block size="medium" borderRadius="round" onPress={handleUpdate}>
          <View tachyons="mr2">
            <Icons.FontAwesome5 name={isIOS ? 'apple' : 'android'} size={18} color="light" />
          </View>
          <Text color="light">{buttonUpdateText}</Text>
        </Button>
        <TouchableOpacity activeOpacity={0.8} onPress={handleUpdate} tachyons="pa3">
          <Text color="dark2" tachyons="tc">
            {moreText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default memo(ModalAppUpdate);
