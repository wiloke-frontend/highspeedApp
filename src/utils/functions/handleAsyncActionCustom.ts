import { handleAsyncAction } from './reduxActions/helpers';
import { Action } from './reduxActions/types';

type State = ReducerState & {
  pageNext: number;
};

export default function handleAsyncActionCustom<
  TState extends State,
  TAction extends Action,
  TRequestType extends TAction['type'],
  TSuccessType extends TAction['type'],
  TFailureType extends TAction['type']
>(types: [TRequestType, TSuccessType, TFailureType]) {
  return handleAsyncAction<TState, TAction, TRequestType, TSuccessType, TFailureType>(types, {
    request: (state, action) => ({
      ...state,
      status: (action.payload?.params?.page || state.pageNext) > 1 ? 'success' : 'loading',
      loadmoreStatus: 'loading',
    }),
    success: (state, action) => ({
      ...state,
      status: 'success',
      loadmoreStatus: 'success',
      data: {
        ...action.payload,
        data:
          (!action.payload?.pagination?.next?.params?.page && !action.payload?.pagination?.prev?.params?.page) ||
          action.payload?.pagination?.next?.params?.page === 2
            ? action.payload.data
            : [...state.data.data, ...action.payload.data],
      },
      pageNext: action.payload?.pagination?.next?.params?.page || state.pageNext + 1,
    }),
    failure: (state, action) => ({
      ...state,
      status: state.pageNext > 1 ? 'success' : 'failure',
      ...(state.pageNext > 1 ? { loadmoreStatus: 'failure' } : {}),
      message: action.payload,
    }),
  });
}
