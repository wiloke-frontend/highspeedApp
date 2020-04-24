import React, { FC } from 'react';
import { View, Button } from 'shared';
import { TagItem } from 'api/PostDetail';
import { Link } from 'navigation';
import { isEmpty } from 'ramda';

interface DetailTagsProps {
  postTags: TagItem[];
}

const renderTagItem = (item: TagItem) => (
  <Link
    key={String(item.id)}
    push="PostsScreen"
    params={{ requestParams: { taxonomies: { post_tag: [item.id] } }, name: item.name }}
    tachyons={['mb1', 'mr1']}
  >
    <Button size="extra-small" borderRadius="round" disabled backgroundColor="gray2" color="dark2">
      {item.name}
    </Button>
  </Link>
);

const DetailTags: FC<DetailTagsProps> = ({ postTags }) => {
  return (
    <View flexDirection="row" tachyons="mb3">
      {!isEmpty(postTags) && !!postTags && postTags.map(renderTagItem)}
    </View>
  );
};

export default DetailTags;
