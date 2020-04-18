import React, { memo, FC } from 'react';
import { Link } from 'navigation';
import { sizeBase } from 'utils/constants/base';
import { Icons, HeaderBase, View, Text } from 'shared';
import BackButton from 'components/BackButton/BackButton';

export interface HeaderSecondaryProps {
  backText?: string;
  title: string;
}

const HeaderSecondary: FC<HeaderSecondaryProps> = ({ backText, title }) => {
  return (
    <>
      <HeaderBase
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
    </>
  );
};

export default memo(HeaderSecondary);
