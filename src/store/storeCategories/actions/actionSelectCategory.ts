import { createAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Category } from 'api/Categories';

export const selectCategory = createAction('@selectCategory', (categories: Category[]) => ({ categories }));

export const useSelectCategory = createDispatchAction(selectCategory);
