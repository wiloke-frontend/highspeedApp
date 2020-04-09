import React, { useLayoutEffect } from 'react';
import { View, useMount, tachyons, FlatList } from 'shared';
import { StackScreenFC } from 'types/Navigation';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import CategoryCard from 'components/CategoryCard/CategoryCard';
import { Link } from 'navigation';
import { Category } from 'api/Categories';
import { useGetCategoriesRequest } from 'store/storeCategories/actions/actionCategories';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';
import { PostsScreenParams } from 'screens/PostsScreen/PostsScreen';
import headerDefaultStyle from 'navigation/headerDefaultStyle';
import Logo from 'components/Logo/Logo';
import HeaderRightDefault from 'components/HeaderRightDefault/HeaderRightDefault';

const CategoryScreen: StackScreenFC = ({ navigation }) => {
  const getCategoriesRequest = useGetCategoriesRequest();
  const categories = useSelector(categoriesSelector);
  const numColumns = 2;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Logo />,
      headerTitle: '',
      headerRight: () => <HeaderRightDefault />,
      ...headerDefaultStyle,
    });
  }, [navigation]);

  useMount(() => {
    getCategoriesRequest({ endpoint: 'category', params: { number: 0 } });
  });

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return (
      <View tachyons="pb3">
        <Link to="PostsScreen" params={{ requestParams: { taxonomies: { category: [item.id] } }, name: item.name } as PostsScreenParams}>
          <CategoryCard imageUri={item.featuredImage.thumbnail} imagePreview={item.featuredImage.preview} title={item.name} />
        </Link>
      </View>
    );
  };

  return (
    <View flex safeAreaView>
      <AsyncComponent
        status={categories.status}
        Success={
          <FlatList
            data={categories.data.data}
            keyExtractor={item => String(item.id)}
            numColumns={numColumns}
            style={tachyons.ph2}
            renderItem={renderCategoryItem}
            showsVerticalScrollIndicator={false}
            useContainer
          />
        }
      />
    </View>
  );
};

export default CategoryScreen;
