import { Post } from 'api/Post';

export interface AvatarUsersCommentItem {
  id: string;
  avatar: string;
}

export interface HomeSectionDataItem extends Post {}

export interface HomeSection {
  status: string;
  data: HomeSectionDataItem[];
}
