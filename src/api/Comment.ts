import { Author } from './Author';
import { DateFull, DateSplit } from './Date';
import { Block, EntityMapDraf } from 'utils/functions/supportDraftJs';

export interface Description {
  blocks: Block[];
  entityMap: EntityMapDraf;
}

export interface Comment {
  id: number;
  title: string;
  author: Author;
  dateFull?: DateFull;
  description: Description | string;
  dateSplit?: DateSplit;
  endpoint?: string;
  childComments: Comment[];
  childCommentTotal: number;
  approved?: string;
  date: string;
  timestamp: number;
}

export interface Comments {
  data: Comment[];
  status: string;
}

export interface UserComment {
  id: number;
  name?: string;
  displayName: string;
  avatar: string;
  email: string;
  link?: string;
}
