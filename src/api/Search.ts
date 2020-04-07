import { Posts } from 'api/Posts';
import { Pagination } from 'api/Pagination';

export interface Search extends Posts {
  pagination?: Pagination<'search'>;
}
