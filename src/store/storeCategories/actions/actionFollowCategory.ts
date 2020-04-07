import { createAsyncAction, createDispatchAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { FollowsEndpoint } from 'api/Endpoint';
import { Category } from 'api/Categories';

export const getCategoriesFollowed = createAsyncAction([
  '@getCategoriesFollowedRequest',
  '@getCategoriesFollowedSuccess',
  '@getCategoriesFollowedFailure',
])<{ endpoint: FollowsEndpoint; callback?: (categoriesSelectedIds: number[]) => void }, { data: Category[] }, { message: string }>();

export const followCategory = createAsyncAction(['@followCategoryRequest', '@followCategorySuccess', '@followCategoryFailure'])<
  {
    endpoint: FollowsEndpoint;
    categories: number[];
  },
  undefined,
  undefined
>();

export const useGetCategoriesFollowed = createDispatchAsyncAction(getCategoriesFollowed);

export const useFollowCategoryRequest = createDispatchAction(followCategory.request);
