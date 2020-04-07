import { PostDefaultProps } from 'types/PostDefaultProps';

export interface CategoryPostItem extends PostDefaultProps {
  avatar: string;
  displayName: string;
  description: string;
}

export interface CategoryPost {
  status: string;
  data: CategoryPostItem[];
  totalPage: number;
}
