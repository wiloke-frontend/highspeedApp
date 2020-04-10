import React from 'react';
import { View, Container, useMount, tachyons } from 'shared';
import HeaderSecondary from 'components/HeaderSecondary/HeaderSecondary';
import Magazine from 'components/Magazine/Magazine';
import { NavigationSuspense, ScreenFC } from 'navigation';
import { useGetPostsWithParamsRequest, PostWithParams } from './actions/actionPosts';
import { useSelector } from 'react-redux';
import { postsWithParamsSelector, pageSelector, maxNumPagesSelector } from './selectors';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { isEmpty } from 'ramda';
import Empty from 'components/Empty/Empty';
import Retry from 'components/Retry/Retry';

export interface PostsScreenParams {
  requestParams: Pick<PostWithParams, 'taxonomies' | 'is_my_favorites'>;
  name: string;
}

const PostsScreen: ScreenFC<PostsScreenParams> = ({ navigation }) => {
  const getPostsWithParamsRequest = useGetPostsWithParamsRequest();
  const postsWithParams = useSelector(postsWithParamsSelector);
  const page = useSelector(pageSelector);
  const maxNumPages = useSelector(maxNumPagesSelector);

  const handleGetPostsWithParams = (page: number) => {
    if (!!navigation.state.params.requestParams) {
      getPostsWithParamsRequest({
        endpoint: 'search',
        params: {
          ...navigation.state.params.requestParams,
          postType: 'post',
          page,
          postsPerPage: 20,
        },
      });
    }
  };

  const handleLoadmore = () => {
    if (!!postsWithParams.pageNext && !!postsWithParams.data.pagination && !!maxNumPages && postsWithParams.pageNext <= maxNumPages) {
      handleGetPostsWithParams(postsWithParams.pageNext);
    }
  };

  useMount(() => {
    handleGetPostsWithParams(1);
  });

  const renderListFooterComponent = () => {
    if (!!page && !!maxNumPages && page <= maxNumPages) {
      return (
        <View tachyons="pa1">
          <Magazine isLoading type="list2" firstType="list2" loadingItems={3} />
        </View>
      );
    }
    return null;
  };

  return (
    <View flex safeAreaView>
      <Container>
        <HeaderSecondary title={navigation.state.params.name} />
      </Container>
      <View flex tachyons="ph3">
        <NavigationSuspense fallback={<Magazine isLoading type="list2" firstType="standard1" />}>
          <AsyncComponent
            status={postsWithParams.status}
            isDataEmpty={isEmpty(postsWithParams.data.data)}
            Request={<Magazine isLoading type="list2" firstType="standard1" />}
            Success={
              <Magazine
                data={postsWithParams.data.data}
                type="list2"
                firstType="standard1"
                useFlatList
                flatListProps={{
                  showsVerticalScrollIndicator: false,
                  onEndReached: handleLoadmore,
                  ListFooterComponent: renderListFooterComponent,
                  removeClippedSubviews: true,
                }}
                containerStyle={tachyons.mb0}
              />
            }
            Empty={<Empty />}
            Failure={<Retry onPress={() => handleGetPostsWithParams(1)} tachyons={['pv4', 'mt3']} />}
          />
        </NavigationSuspense>
      </View>
    </View>
  );
};

export default PostsScreen;
