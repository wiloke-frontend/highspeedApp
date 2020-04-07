import { FeaturedImage } from 'api/FeaturedImage';
import { Author } from 'api/Author';
import { DateSplit, DateFull } from 'api/Date';

export interface Post {
  id: number;
  endpoint: string;
  slug: string;
  featuredImage: FeaturedImage;
  previewFeaturedImage: string;
  title: string;
  author: Author;
  dateSplit: DateSplit;
  dateFull: DateFull;
  excerpt: string;
  postCategories: {
    id: number;
    name: string;
    color: string;
  }[];
}
