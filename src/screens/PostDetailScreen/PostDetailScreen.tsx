import React, { useMemo, useState } from 'react';
import { View, Text, Container, Toast, useTheme } from 'shared';
import DetailCategories from './DetailCategories';
import DetailContent from './DetailContent';
import { ScrollView } from 'react-native';
import DetailHeader from './DetailHeader';
import AuthorInfoCard from 'components/AuthorInfoCard/AuthorInfoCard';
import WilTabs, { TabItem } from 'components/WilTabs/WilTabs';
import { TextSize } from 'components/FontSizeConfig/FontSizeConfig';
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
import { isLoggedInSelector } from 'screens/AuthContainer/selectors';
import { onOpenModalLogin } from 'components/ModalLogin/ModalLogin';
import DetailFeatured from './DetailFeatured';
import DetailToastFavorite from './DetailToastFavorite';
import DetailTutorial from './DetailTutorial';
import { NavigationSuspense, ScreenFC } from 'navigation';
import { Post } from 'api/Post';
import HtmlViewer from 'components/HtmlViewer/HtmlViewer';
import getHtmlViewerTextStyles from 'utils/functions/getHtmlViewerTextStyles';
import BarHeightSpacer from 'components/BarHeightSpacer/BarHeightSpacer';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

export interface PostDetailScreenParams extends Post {}

const PostDetailScreen: ScreenFC<PostDetailScreenParams> = ({ navigation }) => {
  const { colors } = useTheme();
  const postDetails = useSelector(postDetailsSelector);
  const postDetailRelatedPosts = useSelector(postDetailRelatedPostsSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const changePostTextSize = useChangePostTextSize();
  const postFavorite = usePostFavorite();
  const postView = usePostView();
  const getRelatedPosts = useGetRelatedPosts();
  const getPostDetailRequest = useGetPostDetailRequest();
  const getFavorite = useGetFavorite();
  const { params } = navigation.state;

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

  const handleChangeTextSize = (size: TextSize) => {
    changePostTextSize(size);
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
    navigation.navigate('Comments', { id: postDetails[slugCurrent]?.data?.id, title: postDetails[slugCurrent]?.data?.title });
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
              navigation.addListener('didFocus', () => {
                getRelatedPosts.request({ endpoint: tabs[indexFocused]?.key });
                if (isLoggedIn) {
                  getFavorite.request({
                    endpoint: 'user/favorite',
                    postEndpoint: tabs[indexFocused]?.key,
                    postID: tabs[indexFocused]?.id,
                  });
                }
                postView.request({
                  endpoint: 'views',
                  postEndpoint: tabs[indexFocused]?.key,
                  postID: tabs[indexFocused]?.id,
                });
              });
              // lắng nghe navigate did blur thì thực hiện cancel
              navigation.addListener('didBlur', () => {
                postView.cancel();
                getRelatedPosts.cancel();
              });
            }
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      {/<(\|)|>/g.test(postDetail?.data?.title ?? item?.title) ? (
                        <HtmlViewer
                          html={`<h2>${postDetail?.data?.title ?? item?.title}</h2>`}
                          tagsStyles={getHtmlViewerTextStyles(14, colors.primary)}
                          colorBase={colors.dark1}
                        />
                      ) : (
                        <Text type="h2">{postDetail?.data?.title ?? item?.title}</Text>
                      )}
                      <View tachyons={['pa3', 'pb1']} />
                      <AuthorInfoCard
                        authorName={(postDetail?.data?.author?.displayName ?? displayName) || ''}
                        authorEmail={postDetail?.data?.dateFull ?? dateFull ?? ''}
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
            <BarHeightSpacer />
          </ScrollView>
        </View>
      );
    };
  }, [
    colors.dark1,
    colors.primary,
    getFavorite,
    getRelatedPosts,
    handleContentMounted,
    isLoggedIn,
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
    <ScreenContainer
      Header={
        <Container>
          <DetailHeader
            onAfterBack={handleHeaderBack}
            onChangeTextSize={handleChangeTextSize}
            onFavorite={handleFavorite}
            isFavorite={isMyFavoriteCurrent}
            isFavoriteLoading={isMyFavoriteLoading}
            onNavigateToComment={handleNavigateToComment}
            detailWebLink={postDetails[slugCurrent]?.data?.link ?? ''}
          />
        </Container>
      }
      safeAreaView
    >
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
          if (isLoggedIn) {
            getFavorite.request({
              endpoint: 'user/favorite',
              postEndpoint: tabs[index]?.key,
              postID: tabs[index]?.id,
            });
          }
          postView.request({
            endpoint: 'views',
            postEndpoint: tabs[index]?.key,
            postID: tabs[index]?.id,
          });
        }}
      />
    </ScreenContainer>
  );
};

export default PostDetailScreen;
