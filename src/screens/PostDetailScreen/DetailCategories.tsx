import React, { FC } from 'react';
import { View, Button, Text } from 'shared';
import { CategoryItem } from 'api/PostDetail';
import { Link } from 'navigation';
import { isEmpty } from 'ramda';

interface DetailCategoriesProps {
  postCategories: CategoryItem[];
}

const renderCatItem = (item: CategoryItem) => (
  <Link
    key={item.id}
    push="PostsScreen"
    params={{ requestParams: { taxonomies: { category: [item.id] } }, name: item.name }}
    tachyons={['mb1', 'mr1']}
  >
    <Button size="extra-small" borderRadius="round" disabled style={{ backgroundColor: item.color }}>
      <Text colorNative="#fff" tailwind="text-xs">
        {item.name}
      </Text>
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
