import React from 'react';
import { Image as RNImage } from 'react-native';
import { useSelector } from 'react-redux';
import { View, Text, Container, useToggle, Button, useSelectList, useMount, tachyons, withViewStyles } from 'shared';
import HeaderCatFollow from 'components/HeaderCatFollow/HeaderCatFollow';
import i18n from 'utils/functions/i18n';
import { ScreenFC } from 'navigation';
import { isEmpty } from 'ramda';
import Magazine from 'components/Magazine/Magazine';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import { useGetPostsWithCatSelected } from './actions/actionGetPostsWithCatSelected';
import { categoriesSelectedSelector, categoriesSelectedIdsSelector, isLoggedInSelector } from 'store/selectors';
import { postsWithCatSelectedSelector, pageSelector, maxNumPagesSelector } from './selectors';
import { useSelectCategory } from './actions/actionSelectCategory';
import ModalSelectCat from './ModalSelectCat';
import Retry from 'components/Retry/Retry';
import { useFollowCategoryRequest, useGetCategoriesFollowed } from 'store/storeCategories/actions/actionFollowCategory';
import ScreenContainer from 'components/ScreenContainer/ScreenContainer';

const Image = withViewStyles(RNImage);

const SelectCatScreen: ScreenFC = ({ navigation }) => {
  const getPostsWithCatSelected = useGetPostsWithCatSelected();
  const getCategoriesFollowed = useGetCategoriesFollowed();
  const selectCategory = useSelectCategory();
  const followCategoryRequest = useFollowCategoryRequest();
  const categoriesSelected = useSelector(categoriesSelectedSelector);
  const categoriesSelectedIds = useSelector(categoriesSelectedIdsSelector);
  const postsWithCatSelected = useSelector(postsWithCatSelectedSelector);
  const page = useSelector(pageSelector);
  const maxNumPages = useSelector(maxNumPagesSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const [isVisible, onVisibleToggle] = useToggle(false);
  const { outputResult, isSelected, onSelect, onPrevious } = useSelectList({
    inputResult: categoriesSelected.data,
    multiple: true,
  });

  const handleCancel = () => {
    onVisibleToggle();
    onPrevious();
  };

  const handleDone = () => {
    const categoriesSelectedIds = outputResult.map(item => item.id);
    selectCategory(outputResult);
    getPostsWithCatSelected.request({
      endpoint: 'search',
      params: {
        taxonomies: { category: categoriesSelectedIds },
        page: 1,
        postsPerPage: 20,
      },
    });
    if (isLoggedIn) {
      followCategoryRequest({ endpoint: 'categories/following', categories: categoriesSelectedIds });
    }
    onVisibleToggle();
  };

  const handleGetPostsWithCatSelected = (_categoriesSelectedIds = categoriesSelectedIds, page = 1) => {
    if (isEmpty(_categoriesSelectedIds)) {
      return;
    }
    getPostsWithCatSelected.request({
      endpoint: 'search',
      params: {
        taxonomies: { category: _categoriesSelectedIds },
        page,
        postsPerPage: 20,
      },
    });
  };

  const handleLoadmore = () => {
    // nếu pageNext - 1 nhỏ hơn tổng số page thì mới load
    if (!!postsWithCatSelected.pageNext && !!maxNumPages && postsWithCatSelected.pageNext - 1 < maxNumPages) {
      handleGetPostsWithCatSelected(categoriesSelectedIds, postsWithCatSelected.pageNext);
    }
  };

  const handleMouted = () => {
    if (isLoggedIn) {
      getCategoriesFollowed.request({
        endpoint: 'categories/following',
        callback: categoriesSelectedIds => handleGetPostsWithCatSelected(categoriesSelectedIds, 1),
      });
    } else {
      handleGetPostsWithCatSelected(categoriesSelectedIds, 1);
    }
  };

  useMount(() => {
    handleMouted();
  });

  const ChooseCategoriesButton = (
    <View flex justifyContent="center" alignItems="center" tachyons="pa2" style={{ height: 400 }}>
      <Text type="h5" tachyons={['mb2', 'tc']} color="dark2">
        {i18n.t('chooseWhichCategoriesYouWantToFollow')}
      </Text>
      <Image source={require('assets/vectors/articles.jpg')} tachyons={['w100', 'h50']} resizeMode="contain" />
      <Button borderRadius="round" size="medium" onPress={onVisibleToggle}>
        <Text type="h7" tachyons="ph4" style={{ color: '#fff' }}>
          {i18n.t('chooseText', { text: i18n.t('categories') })}
        </Text>
      </Button>
    </View>
  );

  const renderListFooterComponent = () => {
    if (!!maxNumPages && !!page && page <= maxNumPages) {
      return (
        <View tachyons={['ph1', 'nl1', 'nr1']}>
          <Magazine isLoading type="list2" firstType="list2" loadingItems={3} />
        </View>
      );
    }
    // if (postsWithCatSelected.loadmoreStatus === 'failure') {
    //   return (
    //     <Button borderRadius="round" size="small" onPress={handleGetPostsWithCatSelected}>
    //       {i18n.t('loadMore', { text: i18n.t('posts') })}
    //     </Button>
    //   );
    // }
    return null;
  };

  const renderContent = () => {
    const isCatLoading = categoriesSelected.status === 'loading';
    if (!isCatLoading && isEmpty(categoriesSelected.data)) {
      return ChooseCategoriesButton;
    }
    return (
      <View flex>
        <AsyncComponent
          status={postsWithCatSelected.status}
          Request={<Magazine isLoading type="list2" firstType="standard1" />}
          Success={
            <Magazine
              data={postsWithCatSelected.data.data}
              type="list2"
              firstType="standard1"
              useFlatList
              flatListProps={{
                navigation,
                showsVerticalScrollIndicator: false,
                onEndReached: handleLoadmore,
                ListFooterComponent: renderListFooterComponent,
                refreshing: postsWithCatSelected.status === 'loading',
                onRefresh: handleGetPostsWithCatSelected,
              }}
              containerStyle={tachyons.mb0}
            />
          }
          Failure={<Retry tachyons={['pv4', 'mt3']} onPress={handleMouted} />}
        />
      </View>
    );
  };

  return (
    <ScreenContainer
      Header={
        <Container>
          <HeaderCatFollow onEditing={onVisibleToggle} />
        </Container>
      }
      safeAreaView
    >
      <View flex tachyons="ph3">
        {renderContent()}
        <ModalSelectCat onDone={handleDone} onCancel={handleCancel} onSelect={onSelect} isSelected={isSelected} isVisible={isVisible} />
      </View>
    </ScreenContainer>
  );
};

export default SelectCatScreen;
