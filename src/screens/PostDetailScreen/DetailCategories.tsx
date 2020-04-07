import React, { FC } from 'react';
import { View, Button } from 'shared';
import { CategoryItem } from 'api/PostDetail';
import { Link } from 'navigation';
import { isEmpty } from 'ramda';
import { PostsScreenParams } from 'screens/PostsScreen/PostsScreen';

interface DetailCategoriesProps {
  postCategories: CategoryItem[];
}

const renderCatItem = (item: CategoryItem) => (
  <Link
    key={item.id}
    push="PostsScreen"
    params={{ requestParams: { taxonomies: { category: [item.id] } }, name: item.name } as PostsScreenParams}
    tachyons={['mb1', 'mr1']}
  >
    <Button size="extra-small" borderRadius="round" disabled style={{ backgroundColor: item.color }}>
      {item.name}
    </Button>
  </Link>
);

const DetailCategories: FC<DetailCategoriesProps> = ({ postCategories }) => {
  return (
    <View flexDirection="row" tachyons="mb2">
      {!isEmpty(postCategories) && postCategories.map(renderCatItem)}
    </View>
  );
};

export default DetailCategories;
