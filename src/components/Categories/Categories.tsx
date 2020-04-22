import React, { FC } from 'react';
import { View } from 'shared';
import * as R from 'ramda';
import TextBox from 'components/TextBox/TextBox';
import { Link } from 'navigation';
import { Category } from 'api/Categories';

interface CategoriesProps {
  data: Category[];
}

const Categories: FC<CategoriesProps> = ({ data }) => {
  const renderCategoryItem = (item: Category) => {
    return (
      <View key={item.id} tachyons={['mr1', 'mb1']}>
        <Link
          to="PostsScreen"
          params={{
            requestParams: { taxonomies: { category: [item.id] } },
            name: item.name,
          }}
        >
          <TextBox>{item.name}</TextBox>
        </Link>
      </View>
    );
  };

  return (
    <View flexWrap="wrap" flexDirection="row" tachyons="mb3">
      {!R.isEmpty(data) && data.map(renderCategoryItem)}
    </View>
  );
};

export default Categories;
