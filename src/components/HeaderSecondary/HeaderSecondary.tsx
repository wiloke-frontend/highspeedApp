import React, { memo, FC } from 'react';
import { Link } from 'navigation';
import { sizeBase } from 'utils/constants/base';
import { Icons, HeaderBase, View, Text, OfflineNotice } from 'shared';
import BackButton from 'components/BackButton/BackButton';
import i18n from 'utils/functions/i18n';
import { useSelector } from 'react-redux';
import { nightModeSelector } from 'store/selectors';

export interface HeaderSecondaryProps {
  backText?: string;
  title: string;
}

const HeaderSecondary: FC<HeaderSecondaryProps> = ({ backText, title }) => {
  const nightMode = useSelector(nightModeSelector);

  return (
    <>
      <HeaderBase
        statusBarStyle={nightMode ? 'light-content' : 'dark-content'}
        Left={<BackButton backText={backText} tachyons={['pa1', 'nl2', 'mr2']} />}
        Center={<Text type="h7">{title}</Text>}
        Right={[
          <Link key="item1" to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7}>
            <View justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
              <Icons.Feather name="search" size={sizeBase * 1.5} color="dark2" />
            </View>
          </Link>,
        ]}
      />
      <OfflineNotice>{i18n.t('noInternet')}</OfflineNotice>
    </>
  );
};

export default memo(HeaderSecondary);
