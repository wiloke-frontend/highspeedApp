import React, { memo, FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { sizeBase } from 'utils/constants/base';
import { Icons, HeaderBase, View, Text } from 'shared';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Link, NavigationScreenProp } from 'navigation';
import BackButton from 'components/BackButton/BackButton';
import { tabNavigatorSelector, tabNavigatorHasSearchSelector } from 'containers/AppContent/selectors';

export interface SelectCatHeaderProps {
  title?: string;
  backButtonEnabled?: boolean;
  navigation: NavigationScreenProp;
  onEditing?: TouchableOpacityProps['onPress'];
}

const SelectCatHeader: FC<SelectCatHeaderProps> = ({ title = '', backButtonEnabled = false, onEditing, navigation }) => {
  const tabNavigator = useSelector(tabNavigatorSelector);
  const tabNavigatorHasSearch = useSelector(tabNavigatorHasSearchSelector);
  const parentRouteName = !!navigation ? navigation.dangerouslyGetParent()?.state.routeName : '';
  const _title = !!title ? title : !!navigation ? tabNavigator.data.find(item => item.name === parentRouteName)?.label : '';

  return (
    <>
      <HeaderBase
        Left={[
          backButtonEnabled && <BackButton key="item1" tachyons={['pa1', 'nl2', 'mr2']} />,
          <Text key="item2" type="h4">
            {_title}
          </Text>,
        ]}
        Right={[
          <View key="item1" tachyons="mr2">
            {!tabNavigatorHasSearch && (
              <Link to="SearchScreen" params={{ backButtonEnabled: true }} activeOpacity={0.7} tachyons="pa1">
                <Icons.Feather name="search" size={sizeBase * 1.5} color="dark2" />
              </Link>
            )}
          </View>,
          <TouchableOpacity key="item2" activeOpacity={0.7} onPress={onEditing}>
            <View justifyContent="center" alignItems="center" tachyons={['w2', 'h2']}>
              <Icons.Feather name="plus-circle" size={sizeBase * 1.5} color="dark2" />
            </View>
          </TouchableOpacity>,
        ]}
      />
    </>
  );
};

export default memo(withNavigation(SelectCatHeader));
