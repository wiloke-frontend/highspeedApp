import React from 'react';
import { View, Container } from 'shared';
import HeaderSecondary from 'components/HeaderSecondary/HeaderSecondary';
import Magazine from 'components/Magazine/Magazine';
import { useSelector } from 'react-redux';
import { historyPostsSelector } from 'screens/PostDetailScreen/selectors';
import { isEmpty } from 'ramda';
import Empty from 'components/Empty/Empty';
import { NavigationSuspense, ScreenFC } from 'navigation';

const HistoryPostsScreen: ScreenFC = () => {
  const historyPosts = useSelector(historyPostsSelector);

  return (
    <View flex safeAreaView backgroundColor="light">
      <Container>
        <HeaderSecondary title="History" />
      </Container>
      <View flex tachyons="ph2">
        <NavigationSuspense fallback={<Magazine isLoading type="list2" firstType="list2" />}>
          {isEmpty(historyPosts) ? (
            <Empty />
          ) : (
            <Magazine data={historyPosts} type="list2" firstType="list2" useFlatList flatListProps={{ showsVerticalScrollIndicator: false }} />
          )}
        </NavigationSuspense>
      </View>
    </View>
  );
};

export default HistoryPostsScreen;
