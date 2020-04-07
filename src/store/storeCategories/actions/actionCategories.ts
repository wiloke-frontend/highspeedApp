import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Categories } from 'api/Categories';
import { CategoryEndpoint } from 'api/Endpoint';

export interface CategoriesRequestCallback {
  endpoint: CategoryEndpoint;
  params: {
    number: number;
  };
}

export const getCategories = createAsyncAction(['@getCategoriesRequest', '@getCagegoriesSuccess', '@getCategoriesFailure'])<
  CategoriesRequestCallback,
  Categories,
  string
>();

export const useGetCategoriesRequest = createDispatchAction(getCategories.request);
