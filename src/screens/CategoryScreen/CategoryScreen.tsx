import React from 'react';
import { View, useMount, Container, tachyons, FlatList } from 'shared';
import HeaderDefault from 'components/HeaderDefault/HeaderDefault';
import AsyncComponent from 'components/AsyncComponent/AsyncComponent';
import CategoryCard from 'components/CategoryCard/CategoryCard';
import { Link, ScreenFC } from 'navigation';
import { Category } from 'api/Categories';
import { useGetCategoriesRequest } from 'store/storeCategories/actions/actionCategories';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';
import { ScreenParams } from 'types/ScreenParams';

const CategoryScreen: ScreenFC<ScreenParams> = ({ navigation }) => {
  const getCategoriesRequest = useGetCategoriesRequest();
  const categories = useSelector(categoriesSelector);
  const numColumns = 2;

  useMount(() => {
    getCategoriesRequest({ endpoint: 'category', params: { number: 0 } });
  });

  const renderCategoryItem = ({ item }: { item: Category }) => {
    return (
      <View tachyons="pb3">
        <Link to="PostsScreen" params={{ requestParams: { taxonomies: { category: [item.id] } }, name: item.name }}>
          <CategoryCard imageUri={item.featuredImage.thumbnail} imagePreview={item.featuredImage.preview} title={item.name} />
        </Link>
      </View>
    );
  };

  return (
    <View flex safeAreaView backgroundColor="light">
      <Container>
        <HeaderDefault title={navigation.state?.params?.title} backButtonEnabled={navigation.state?.params?.backButtonEnabled} />
      </Container>
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
