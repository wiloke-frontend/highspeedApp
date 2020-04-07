import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { Category } from 'api/Categories';
import { selectCategory } from '../actions/actionSelectCategory';
import { getCategoriesFollowed } from '../actions/actionFollowCategory';

type CatSelectedAction = ActionTypes<typeof selectCategory | typeof getCategoriesFollowed>;

type CatSelectedState = ReducerState<Category[]>;

const initialState: CatSelectedState = {
  data: [],
};

export const categoriesSelected = createReducer<CatSelectedState, CatSelectedAction>(initialState, [
  handleAction('@selectCategory', (state, action) => ({
    ...state,
    status: 'success',
    data: action.payload.categories,
  })),
  handleAction('@getCategoriesFollowedRequest', state => ({
    ...state,
    status: 'loading',
  })),
  handleAction('@getCategoriesFollowedSuccess', (state, action) => ({
    ...state,
    status: 'success',
    data: action.payload.data,
  })),
  handleAction('@getCategoriesFollowedFailure', (state, action) => ({
    ...state,
    status: 'failure',
    message: action.payload.message,
  })),
]);
