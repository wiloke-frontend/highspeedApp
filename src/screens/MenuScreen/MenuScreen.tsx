import React from 'react';
import { Container, View, useMount } from 'shared';
import { ScreenFC } from 'navigation';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';
import { useSelector } from 'react-redux';
import { menuSelector } from './selectors';
import { FlatList } from 'react-native';
import { useGetMenuRequest } from './actions/actionMenu';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import MenuListItem from './MenuListItem';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

const MenuScreen: ScreenFC = () => {
  const menu = useSelector(menuSelector);
  const getMenuRequest = useGetMenuRequest();

  useMount(() => {
    getMenuRequest({ endpoint: 'hamburger-menu' });
  });

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderDefault />
        </Container>
      }
      safeAreaView
    >
      <View flex tachyons="ph2">
        <AsyncComponent
          status={menu.status}
          Success={
            <Container>
              <FlatList
                data={menu.data}
                keyExtractor={item => item.key}
                renderItem={({ item, index }) => <MenuListItem item={item} index={index} />}
              />
            </Container>
          }
        />
      </View>
    </ScreenContainer>
  );
};

export default MenuScreen;
