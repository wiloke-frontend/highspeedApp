import { FeaturedImage } from 'api/FeaturedImage';

export interface PostDefaultProps {
  id: number;
  endpoint: string;
  slug: string;
  title: string;
  dateFull?: string;
  featuredImage?: FeaturedImage;
  previewFeaturedImage?: string;
  excerpt?: string;
  postCategories: {
    id: number;
    name: string;
    color: string;
  }[];
}
