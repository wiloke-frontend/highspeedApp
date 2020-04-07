import React, { FC } from 'react';
import { View } from 'shared';
import { Link } from 'navigation';
import ImageSmallCard from 'components/ImageSmallCard/ImageSmallCard';

interface DetailPagerProps {
  postDetail: ValueOf<AppState['postDetails']>;
}

const DetailPager: FC<DetailPagerProps> = ({ postDetail }) => {
  return (
    <View flexDirection="row" tachyons={['na1', 'mb3']}>
      <View column="3/6">
        {!!postDetail?.data?.prevPost?.title && (
          <Link push="PostDetailNotGetureDistance" params={postDetail?.data?.prevPost} tachyons="pa1">
            <ImageSmallCard imageUri={postDetail?.data?.prevPost?.featuredImage?.thumbnail} title="Prev" text={postDetail?.data?.prevPost?.title} />
          </Link>
        )}
      </View>
      <View column="3/6">
        {!!postDetail?.data?.nextPost?.title && (
          <Link push="PostDetailNotGetureDistance" params={postDetail?.data?.nextPost} tachyons="pa1">
            <ImageSmallCard imageUri={postDetail?.data?.nextPost?.featuredImage?.thumbnail} title="Next" text={postDetail?.data?.nextPost.title} />
          </Link>
        )}
      </View>
    </View>
  );
};

export default DetailPager;
