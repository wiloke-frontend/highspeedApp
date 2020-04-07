import { createReducer, ActionTypes, handleAction, handleActions } from 'utils/functions/reduxActions';
import { getNotifications, postNotify, deleteNotify } from '../actions/actionNotifications';
import handleAsyncActionCustom from 'utils/functions/handleAsyncActionCustom';
import { Notifications } from 'api/Notifications';

type NotificationsAction = ActionTypes<typeof getNotifications | typeof postNotify | typeof deleteNotify>;

type NotificationsState = ReducerState<Partial<Notifications>>;

const initialState: NotificationsState = {
  data: {},
  pageNext: 1,
};

export const notifications = createReducer<NotificationsState, NotificationsAction>(initialState, [
  ...handleAsyncActionCustom(['@getNotificationsRequest', '@getNotificationsSuccess', '@getNotificationsFailure']),
  handleAction('@postNotifySuccess', (state, action) => {
    state.data.data = !!state.data.data
      ? state.data.data.map(item => ({
          ...item,
          seen: item.id === action.payload.id ? true : item.seen,
        }))
      : [];
    return state;
  }),
  handleActions(['@deleteNotifyRequest', '@deleteNotifySuccess'], (state, action) => {
    state.data.data = !!state.data.data ? state.data.data.filter(item => item.id !== action.payload.id) : [];
    return state;
  }),
]);
