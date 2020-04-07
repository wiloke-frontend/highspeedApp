import React, { FC } from 'react';
import { PostFormatType, PostFormatData, PostFormatGalleryItem } from 'api/PostDetail';
import { Image } from 'shared';
import SoundCloud from 'components/SoundCloud/SoundCloud';
import Video from 'components/Video/Video';
import DetailFeaturedGrid from './DetailFeaturedGrid';

export interface DetailFeaturedProps {
  formatType: PostFormatType;
  formatData?: PostFormatData;
  featuredImagePreview: string;
  featuredImageUri: string;
}

const DetailFeatured: FC<DetailFeaturedProps> = ({ formatType, formatData, featuredImagePreview, featuredImageUri }) => {
  switch (formatType) {
    case 'audio':
      return <SoundCloud uri={formatData as string} tachyons="mb3" />;
    case 'video':
      return (
        <Video
          uri={formatData as string}
          thumbnailUri={featuredImageUri}
          thumbnailPreview={featuredImagePreview}
          tachyons={['mb3', 'br3', 'overflowHidden']}
        />
      );
    case 'gallery':
      return <DetailFeaturedGrid data={(formatData as PostFormatGalleryItem[]) || []} />;
    case 'standard':
    default:
      return <Image preview={featuredImagePreview} uri={featuredImageUri} percentRatio="56.25%" borderRadius="round" tachyons="mb3" />;
  }
};

export default DetailFeatured;
