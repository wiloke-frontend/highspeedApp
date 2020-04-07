import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { PaginationParams } from 'api/Pagination';
import { Search } from 'api/Search';
import { SearchEndpoint } from 'api/Endpoint';

export interface PostWithParams extends PaginationParams {
  taxonomies: {
    category: number[];
    post_tag: number[];
  };
  postType: 'post';
  orderby: string;
  is_my_favorites: 'yes' | 'no';
}

export const getPostsWithParams = createAsyncAction(['@getPostsWithParamsRequest', '@getPostsWithParamsSuccess', '@getPostsWithParamsFailure'])<
  { endpoint: SearchEndpoint; params: PostWithParams },
  Search,
  string
>();

export const useGetPostsWithParamsRequest = createDispatchAction(getPostsWithParams.request);
