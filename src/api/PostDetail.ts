import { FeaturedImage } from 'api/FeaturedImage';
import { Author } from 'api/Author';
import { DateSplit, DateFull } from 'api/Date';
import { TextToSpeechProps } from 'components/TextToSpeech/TextToSpeech';

export interface CategoryItem {
  id: number;
  name: string;
  endpoint: string;
  color: string;
  featuredImage: {
    thumbnail: string;
    medium: string;
    large: string;
    preview: string;
  };
  iconImage: {
    large: string;
  };
}

export type PostFormatType = 'standard' | 'audio' | 'video' | 'gallery';

export interface PostFormatGalleryItem {
  attachmentId: number;
  imageSize: {
    thumbnail: string;
    medium: string;
    large: string;
  };
}

export type PostFormatData = PostFormatGalleryItem[] | string;

export interface TagItem {
  id: number;
  name: string;
  endpoint: string;
}

export interface Pager {
  title: string;
  featuredImage: FeaturedImage;
  previewFeaturedImage: string;
  endpoint: string;
}

export interface PostDetailData {
  id: number;
  slug: string;
  endpoint: string;
  featuredImage: FeaturedImage;
  avatarUsersComment: string;
  previewFeaturedImage: string;
  title: string;
  description: string;
  author: Author;
  dateSplit: DateSplit;
  dateFull: DateFull;
  postComments: {
    total: number;
  };
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  isMyFavorite: boolean;
  postCategories: CategoryItem[];
  postTags: TagItem[];
  excerpt: string;
  nextPost: Pager;
  prevPost: Pager;
  isSocialSharing: boolean;
  postFormat: {
    type: PostFormatType;
    data: PostFormatData;
  };
  link: string;
  languageSpeech: TextToSpeechProps['lang'];
}

export interface PostDetail {
  status: string;
  data: PostDetailData;
}
