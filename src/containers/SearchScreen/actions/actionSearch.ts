import { createAction, createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Search } from 'api/Search';
import { Posts } from 'api/Posts';
import { SearchEndpoint, TrendingEndpoint } from 'api/Endpoint';

export const searchScreenMounted = createAction('@searchScreenMounted');

export const getTrending = createAsyncAction(['@getTrendingRequest', '@getTrendingSuccess', '@getTrendingFailure'])<
  TrendingEndpoint,
  Posts['data'],
  string
>();

export const searchChange = createAsyncAction(['@searchChangeRequest', '@searchChangeSuccess', '@searchChangeFailure'])<
  { endpoint: SearchEndpoint; query: string },
  Search['data'],
  string
>();

export const useSearchScreenMounted = createDispatchAction(searchScreenMounted);

export const useSearchChangeRequest = createDispatchAction(searchChange.request);
