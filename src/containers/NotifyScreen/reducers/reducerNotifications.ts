import { createReducer, ActionTypes, handleAction, handleActions } from 'utils/functions/reduxActions';
import { getNotifications, postNotify, deleteNotify } from '../actions/actionNotifications';
import handleAsyncActionCustom from 'utils/functions/handleAsyncActionCustom';
import { Notifications } from 'api/Notifications';
import { getNotificationTotal } from 'containers/AppContent/actions/actionNotificationTotal';
import { logout } from 'containers/Auth/actions/actionAuth';

type NotificationsAction = ActionTypes<
  typeof getNotifications | typeof postNotify | typeof deleteNotify | typeof getNotificationTotal | typeof logout
>;

type NotificationsState = ReducerState<Notifications> & {
  noSeenTotal: number;
};

const initialState: NotificationsState = {
  data: {
    status: 'success',
    data: [],
  },
  noSeenTotal: 0,
  pageNext: 1,
};

export const notifications = createReducer<NotificationsState, NotificationsAction>(initialState, [
  ...handleAsyncActionCustom(['@getNotificationsRequest', '@getNotificationsSuccess', '@getNotificationsFailure']),
  handleAction('@getNotificationTotalSuccess', (state, action) => {
    state.noSeenTotal = action.payload.data.total;
    return state;
  }),
  handleAction('@postNotifySuccess', (state, action) => {
    state.data.data = !!state.data.data
      ? state.data.data.map(item => ({
          ...item,
          seen: item.id === action.payload.id ? true : item.seen,
        }))
      : [];
    state.noSeenTotal = state.noSeenTotal > 0 ? state.noSeenTotal - 1 : state.noSeenTotal;
    return state;
  }),
  handleActions(['@deleteNotifyRequest', '@deleteNotifySuccess'], (state, action) => {
    state.data.data = !!state.data.data ? state.data.data.filter(item => item.id !== action.payload.id) : [];
    return state;
  }),
  handleAction('@deleteNotifySuccess', (state, action) => {
    state.noSeenTotal = !action.payload.seen && state.noSeenTotal > 0 ? state.noSeenTotal - 1 : state.noSeenTotal;
    return state;
  }),
  handleAction('@logout', () => initialState),
]);
