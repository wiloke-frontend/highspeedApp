import React, { useState } from 'react';
import { useMount, View, Container, tachyons } from 'shared';
import Magazine from 'components/Magazine/Magazine';
import Empty from 'components/Empty/Empty';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import { ScrollView } from 'react-native';
import BarHeightSpacer from 'components/BarHeightSpacer/BarHeightSpacer';
import { NavigationSuspense, ScreenFC } from 'navigation';
import HeaderSearch from 'components/HeaderSearch/HeaderSearch';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { ScreenParams } from 'types/ScreenParams';
import { useSearchScreenMounted, useSearchChangeRequest } from './actions/actionSearch';
import { useSelector } from 'react-redux';
import { trendingPostsSelector, searchResultSelector } from './selectors';
import { isEmpty } from 'ramda';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

const SearchScreen: ScreenFC<ScreenParams> = ({ navigation }) => {
  const searchScreenMounted = useSearchScreenMounted();
  const searchChangeRequest = useSearchChangeRequest();
  const trendingPosts = useSelector(trendingPostsSelector);
  const searchResult = useSelector(searchResultSelector);
  const [value, setValue] = useState('');

  const handleSearch = (value: string) => {
    setValue(value);
    searchChangeRequest({ endpoint: 'search', query: value });
  };

  useMount(() => {
    searchScreenMounted();
  });

  const DefaultContent = (
    <NavigationSuspense>
      <ScrollView
        contentContainerStyle={tachyons.mt2}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {/* <View tachyons="ph2">
          <SectionTitle text="Categories" color="primary" arrowRightEnabled={false} />
          <Categories data={categories.data?.data} />
        </View> */}
        <AsyncComponent
          status={trendingPosts.status}
          Request={
            <View tachyons={['ph3', 'pv2']}>
              <Magazine isLoading type="list2" firstType="list2" />
            </View>
          }
          Success={
            <View tachyons="ph3">
              <Container>
                <SectionTitle text="Trending" color="primary" arrowRightEnabled={false} />
              </Container>
              <Magazine data={trendingPosts.data} type="list2" firstType="list2" />
            </View>
          }
          Failure={<Empty />}
        />
        <BarHeightSpacer />
      </ScrollView>
    </NavigationSuspense>
  );

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderSearch onSearch={handleSearch} backButtonEnabled={!!navigation?.state?.params?.backButtonEnabled} />
        </Container>
      }
      safeAreaView
    >
      {!!value ? (
        <View flex tachyons={['pv2', 'ph3']}>
          <AsyncComponent
            status={searchResult.status}
            isDataEmpty={isEmpty(searchResult.data)}
            Request={<Magazine isLoading type="list2" firstType="list2" />}
            Success={
              <Magazine
                data={searchResult.data}
                type="list2"
                firstType="list2"
                useFlatList
                flatListProps={{
                  showsVerticalScrollIndicator: false,
                }}
              />
            }
            Empty={<Empty />}
          />
        </View>
      ) : (
        DefaultContent
      )}
    </ScreenContainer>
  );
};

export default SearchScreen;