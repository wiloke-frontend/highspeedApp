import React, { FC, memo } from 'react';
import { Text, Button } from 'shared';
import { HomeDataItem } from 'api/Home';
import { Link } from 'navigation';
import { PostsScreenParams } from 'screens/PostsScreen/PostsScreen';

export interface ButtonShowAllProps {
  sectionSkeleton: HomeDataItem;
}

const ButtonShowAll: FC<ButtonShowAllProps> = ({ sectionSkeleton }) => {
  return (
    <Link
      to="HomePostsScreen"
      params={
        {
          requestParams: !!sectionSkeleton.params?.orderby
            ? {
                orderby: sectionSkeleton.params?.orderby,
                // taxonomies: { category: sectionSkeleton.params?.taxonomy?.category || [] },
              }
            : {},
          name: sectionSkeleton.general.heading,
        } as PostsScreenParams
      }
      tachyons={['mb3', 'pb1']}
    >
      <Button block disabled borderColor="primary" backgroundColor="transparent" borderRadius="round">
        <Text type="h7" color="primary">{`${sectionSkeleton.general.heading} (+${sectionSkeleton.general?.maxPosts})`}</Text>
      </Button>
    </Link>
  );
};

export default memo(ButtonShowAll);
