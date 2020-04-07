import { FeaturedImage } from './FeaturedImage';
import { Pagination } from './Pagination';
import { Comment } from './Comment';

export interface Notify {
  id: number;
  postID: number;
  type: 'post' | 'comment';
  thumbnail: FeaturedImage['thumbnail'];
  date: string;
  timestamp: number;
  title: string;
  authorName: string;
  authorAvatar: string;
  seen: boolean;
  endpoint: string;
  parentComment?: Comment;
}

export interface Notifications {
  status: 'success' | 'error';
  data: Notify[];
  pagination: Pagination<'notifications'>;
}
