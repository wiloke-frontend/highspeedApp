import React, { memo } from 'react';
import { TextInputProps } from 'react-native';
import BackButton from 'components/BackButton/BackButton';
import { HeaderBase, Input, Icons, OfflineNotice } from 'shared';
import { styles } from './styles';
import i18n from 'utils/functions/i18n';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'store/selectors';

interface HeaderSearchProps {
  backButtonEnabled: boolean;
  onSearch?: TextInputProps['onChangeText'];
}

function HeaderSearch({ backButtonEnabled = false, onSearch = () => {} }: HeaderSearchProps) {
  const nightMode = useSelector(nightModeSelector);

  const _handleChangeText: TextInputProps['onChangeText'] = value => {
    onSearch(value);
  };

  return (
    <>
      <HeaderBase
        statusBarStyle={nightMode ? 'light-content' : 'dark-content'}
        Left={backButtonEnabled && <BackButton tachyons={['pa1', 'nl2', 'mr2']} />}
        Right={
          <Input
            placeholder={i18n.t('search')}
            borderColor="transparent"
            backgroundColor="gray2"
            clearButtonMode="while-editing"
            Left={<Icons.Feather name="search" size={20} color="dark3" style={{ marginHorizontal: 10 }} />}
            onChangeText={_handleChangeText}
            onClearText={_handleChangeText}
            containerStyle={backButtonEnabled ? styles.input : {}}
          />
        }
      />
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
    </>
  );
}

export default memo(HeaderSearch);
