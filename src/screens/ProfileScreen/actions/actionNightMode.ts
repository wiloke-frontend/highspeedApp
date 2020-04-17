import { createAction, createDispatchAction } from 'utils/functions/reduxActions';

export const changeNightMode = createAction('@changeNightMode');

export const useChangeNightMode = createDispatchAction(changeNightMode);
