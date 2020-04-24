import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { PaginationParams } from 'api/Pagination';
import { Search } from 'api/Search';
import { SearchEndpoint } from 'api/Endpoint';

interface Params extends PaginationParams {
  taxonomies: { category: number[] };
}

interface InputRequest {
  endpoint: SearchEndpoint;
  params: Params;
}

export const getPostsWithCatSelected = createAsyncAction([
  '@getPostsWithCatSelectedRequest',
  '@getPostsWithCatSelectedSuccess',
  '@getPostsWithCatSelectedFailure',
])<InputRequest, Search, string>();

export const useGetPostsWithCatSelected = createDispatchAsyncAction(getPostsWithCatSelected);
