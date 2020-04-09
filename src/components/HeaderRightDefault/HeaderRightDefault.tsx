import React, { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { sizeBase } from 'utils/constants/base';
import { Icons, View } from 'shared';
import { TouchableOpacity } from 'react-native';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import { Link } from 'navigation';
import { userAvatarSelector, isLoggedInSelector, userNameSelector } from 'store/selectors';
import Avatar from 'components/Avatar/Avatar';

const HeaderRightDefault: FC = () => {
  const avatar = useSelector(userAvatarSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const name = useSelector(userNameSelector);

  return (
    <View tachyons={['flexRow', 'justifyCenter', 'itemsCenter']}>
      <View tachyons="mr2">
        <Link to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7} tachyons="pa1">
          <Icons.Feather name="search" size={sizeBase * 1.5} color="dark2" />
        </Link>
      </View>
      {isLoggedIn ? (
        <Link to="ProfileScreen" activeOpacity={0.8}>
          <Avatar uri={avatar} size={25} name={name} />
        </Link>
      ) : (
        <TouchableOpacity onPress={onOpenModalLogin}>
          <View justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
            <Icons.Feather name="user" size={sizeBase * 1.5} color="dark2" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderRightDefault);
