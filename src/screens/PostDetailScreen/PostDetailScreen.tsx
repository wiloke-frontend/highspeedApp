import React, { useMemo, useState } from 'react';
import { View, Text, Container, Toast } from 'shared';
import DetailCategories from './DetailCategories';
import { StackScreenFC, CommentScreenParams } from 'types/Navigation';
import DetailContent from './DetailContent';
import { ScrollView } from 'react-native';
import DetailHeader from './DetailHeader';
import AuthorInfoCard from 'components/AuthorInfoCard/AuthorInfoCard';
import WilTabs, { TabItem } from 'components/WilTabs/WilTabs';
import { useSelector } from 'react-redux';
import { postDetailsSelector, postDetailRelatedPostsSelector } from './selectors';
import {
  useChangePostTextSize,
  usePostFavorite,
  useGetPostDetailRequest,
  usePostView,
  useGetRelatedPosts,
  useGetFavorite,
} from './actions/actionPostDetail';
import { isLoggedInSelector } from 'store/selectors';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import DetailFeatured from './DetailFeatured';
import DetailToastFavorite from './DetailToastFavorite';
import { isEmpty } from 'ramda';
import DetailTutorial from './DetailTutorial';
import { NavigationSuspense } from 'navigation';
import { Post } from 'api/Post';
import Layout from 'components/Layout/Layout';

export interface PostDetailScreenParams extends Pick<Post, 'id' | 'slug' | 'title' | 'dateFull' | 'author'> {}

const PostDetailScreen: StackScreenFC<'PostDetailScreen'> = ({ route, navigation }) => {
  const postDetails = useSelector(postDetailsSelector);
  const postDetailRelatedPosts = useSelector(postDetailRelatedPostsSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const changePostTextSize = useChangePostTextSize();
  const postFavorite = usePostFavorite();
  const postView = usePostView();
  const getRelatedPosts = useGetRelatedPosts();
  const getPostDetailRequest = useGetPostDetailRequest();
  const getFavorite = useGetFavorite();
  const { params } = route;

  const [postsLoaded, setPostsLoaded] = useState<{ [key: string]: boolean }>({});
  const [slugCurrent, setSlugCurrent] = useState('');
  const postDetailRelatedPost = postDetailRelatedPosts[params.slug ?? ''];
  const postRelatedEndpoints = postDetailRelatedPost?.data?.data
    ? postDetailRelatedPost?.data?.data.map(item => ({ key: item.slug, title: item.title, id: item.id }))
    : [];
  const tabs = [{ key: params.slug ?? '', title: params.title ?? '', id: params.id }, ...postRelatedEndpoints];
  const isMyFavoriteCurrent = !!postDetails[slugCurrent]?.data?.isMyFavorite;
  const isMyFavoriteLoading = !!postDetails[slugCurrent]?.isFavoriteLoading;
  const postCurrentID = postDetails[slugCurrent]?.data?.id ?? 0;

  const handleContentMounted = useMemo(() => {
    return (key: string) => () => {
      setPostsLoaded(state => ({
        ...state,
        [key]: true,
      }));
      // kiểm tra nếu post chưa có dữ liệu thì mới request
      if (!postsLoaded[key]) {
        getPostDetailRequest(key);
      }
    };
  }, [getPostDetailRequest, postsLoaded]);

  // back and reset postsLoaded
  const handleHeaderBack = () => {
    setPostsLoaded({});
  };

  const handleToastFavorite = (isAdded: boolean) => {
    if (isAdded) {
      Toast.show({
        content: <DetailToastFavorite />,
      });
    }
  };

  const handleFavorite = () => {
    if (isLoggedIn && !!postCurrentID) {
      postFavorite.request({
        endpoint: 'user/favorite',
        postEndpoint: slugCurrent,
        postID: postCurrentID,
        callback: handleToastFavorite,
      });
    } else {
      onOpenModalLogin();
    }
  };

  const handleNavigateToComment = () => {
    navigation.navigate('Comments', {
      id: postDetails[slugCurrent]?.data?.id,
      title: postDetails[slugCurrent]?.data?.title,
    } as CommentScreenParams);
  };

  const renderTabContent = useMemo(() => {
    return (item: TabItem & { id: number }, _nextItem: TabItem & { id: number }, _index: number, indexFocused: number) => {
      const postDetail = postDetails[item.key];
      const postDetailRelatedPostCurrent = postDetailRelatedPosts[item.key];
      // cải thiện performance khi nhiều tab: chỉ render tab current và 2 tab trước + sau nó
      const checkTabVisible =
        item.key === tabs[indexFocused]?.key ||
        item.key === tabs[indexFocused - 1]?.key ||
        item.key === tabs[indexFocused - 2]?.key ||
        item.key === tabs[indexFocused + 1]?.key ||
        item.key === tabs[indexFocused + 2]?.key;
      // mounted tab current và 1 tab trước + sau
      const checkMounted =
        item.key === tabs[indexFocused]?.key || item.key === tabs[indexFocused - 1]?.key || item.key === tabs[indexFocused + 1]?.key;
      const previewFeaturedImage = params.slug === item.key ? params.previewFeaturedImage : '';
      const featuredImage = params.slug === item.key ? params.featuredImage?.large : '';
      const displayName = params.slug === item.key ? params.author?.displayName : '';
      const dateFull = params.slug === item.key ? params.dateFull : '';
      const avatar = params.slug === item.key ? params.author?.avatar : '';

      return (
        <View
          onMount={() => {
            setSlugCurrent(tabs[indexFocused]?.key);
            if (item.key === tabs[indexFocused]?.key) {
              // lắng nghe navigate did focus thì thực hiện
              navigation.addListener('focus', () => {
                // nếu postDetailRelated rỗng thì mới request
                if (isEmpty(postDetailRelatedPostCurrent?.data)) {
                  getRelatedPosts.request({ endpoint: tabs[indexFocused]?.key });
                }
                getFavorite.request({
                  endpoint: 'user/favorite',
                  postEndpoint: tabs[indexFocused]?.key,
                  postID: tabs[indexFocused]?.id,
                });
                postView.request({
                  endpoint: 'views',
                  postEndpoint: tabs[indexFocused]?.key,
                  postID: tabs[indexFocused]?.id,
                });
              });
              // lắng nghe navigate did blur thì thực hiện cancel
              navigation.addListener('blur', () => {
                postView.cancel();
                getRelatedPosts.cancel();
              });
            }
          }}
        >
          <ScrollView>
            <Container tachyons="ph3">
              <DetailFeatured
                formatType={postDetail?.data?.postFormat?.type ?? 'standard'}
                formatData={postDetail?.data?.postFormat?.data}
                featuredImagePreview={postDetail?.data?.featuredImage?.large ?? previewFeaturedImage ?? ''}
                featuredImageUri={postDetail?.data?.featuredImage?.large ?? featuredImage ?? ''}
              />
              {checkMounted && (
                <View onMount={handleContentMounted(item.key)}>
                  {checkTabVisible && (
                    <>
                      <DetailCategories postCategories={postDetail?.data?.postCategories ?? []} />
                      <Text type="h2">{postDetail?.data?.title ?? item?.title}</Text>
                      <View tachyons={['pa3', 'pb1']} />
                      <AuthorInfoCard
                        authorName={(postDetail?.data?.author?.displayName ?? displayName) || ''}
                        authorEmail={(postDetail?.data?.dateFull ?? dateFull) || ''}
                        authorAvatar={(postDetail?.data?.author?.avatar ?? avatar) || ''}
                        likeTotal={postDetail?.data?.favoriteCount}
                        viewTotal={postDetail?.data?.viewCount}
                        tachyons="mb3"
                      />
                      <DetailContent postDetail={postDetail} postDetailRelatedPost={postDetailRelatedPostCurrent} />
                    </>
                  )}
                </View>
              )}
            </Container>
          </ScrollView>
        </View>
      );
    };
  }, [
    getFavorite,
    getRelatedPosts,
    handleContentMounted,
    navigation,
    params.author,
    params.dateFull,
    params.featuredImage,
    params.previewFeaturedImage,
    params.slug,
    postDetailRelatedPosts,
    postDetails,
    postView,
    tabs,
  ]);

  return (
    <Layout
      Header={
        <Container>
          <DetailHeader
            onAfterBack={handleHeaderBack}
            onChangeTextSize={changePostTextSize}
            onFavorite={handleFavorite}
            isFavorite={isMyFavoriteCurrent}
            isFavoriteLoading={isMyFavoriteLoading}
            onNavigateToComment={handleNavigateToComment}
            detailWebLink={postDetails[slugCurrent]?.data?.link ?? ''}
          />
        </Container>
      }
      Content={
        <>
          <NavigationSuspense>
            <DetailTutorial />
          </NavigationSuspense>
          <WilTabs
            tabDisabled
            data={tabs}
            renderItem={renderTabContent}
            onSwipeEnd={(_item, _nextItem, index) => {
              setSlugCurrent(tabs[index]?.key);
              postView.cancel();
              getRelatedPosts.cancel();
              getRelatedPosts.request({ endpoint: tabs[index]?.key });
              getFavorite.request({
                endpoint: 'user/favorite',
                postEndpoint: tabs[index]?.key,
                postID: tabs[index]?.id,
              });
              postView.request({
                endpoint: 'views',
                postEndpoint: tabs[index]?.key,
                postID: tabs[index]?.id,
              });
            }}
          />
        </>
      }
    />
  );
};

export default PostDetailScreen;
