import React, { memo, FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, OfflineNotice } from 'shared';
import { HeaderBase } from 'shared';
import i18n from 'utils/functions/i18n';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'store/selectors';

export interface HeaderTertiaryProps {
  centerText: string;
  onCancel: () => void;
  onDone: () => void;
}

const HeaderTertiary: FC<HeaderTertiaryProps> = ({ onCancel, onDone, centerText }) => {
  const nightMode = useSelector(nightModeSelector);

  return (
    <>
      <HeaderBase
        statusBarStyle={nightMode ? 'light-content' : 'dark-content'}
        Left={
          <TouchableOpacity activeOpacity={0.7} onPress={onCancel}>
            <Text>{i18n.t('cancel')}</Text>
          </TouchableOpacity>
        }
        Center={<Text type="h7">{centerText}</Text>}
        Right={
          <TouchableOpacity activeOpacity={0.7} onPress={onDone}>
            <Text color="primary">{i18n.t('done')}</Text>
          </TouchableOpacity>
        }
      />
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
    </>
  );
};

export default memo(HeaderTertiary);
