import React, { memo, FC } from 'react';
import { View, Text, useMount } from 'shared';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import i18n from 'utils/functions/i18n';
import { categoriesSelectedSelector } from 'store/selectors';
import SliderCategories from 'components/SliderCategories/SliderCategories';
import { useGetCategoriesFollowed } from 'store/storeCategories/actions/actionFollowCategory';

const InterestCategories: FC = () => {
  const getCategoriesFollowed = useGetCategoriesFollowed();
  const categoriesSelected = useSelector(categoriesSelectedSelector);

  useMount(() => {
    getCategoriesFollowed.request({
      endpoint: 'categories/following',
    });
  });

  if (isEmpty(categoriesSelected.data)) {
    return null;
  }

  return (
    <View>
      <Text type="h6" tachyons={['pt3', 'pb2', 'ph3']}>
        {i18n.t('yourInterest', { text: i18n.t('categories') }).replace(/\s+\w/g, f => f.toLowerCase())}
      </Text>
      <View>
        <SliderCategories data={categoriesSelected.data} />
      </View>
    </View>
  );
};

export default memo(InterestCategories);
