import { createAsyncAction, createDispatchAction } from 'utils/functions/reduxActions';
import { Notifications } from 'api/Notifications';
import { NotificationsEndpoint } from 'api/Endpoint';

export const getNotifications = createAsyncAction(['@getNotificationsRequest', '@getNotificationsSuccess', '@getNotificationsFailure'])<
  { endpoint: NotificationsEndpoint; params: { page: number; postsPerPage: number } },
  Notifications,
  string
>();

export const postNotify = createAsyncAction(['@postNotifyRequest', '@postNotifySuccess', '@postNotifyFailure'])<
  { endpoint: 'notifications'; id: number },
  { id: number },
  string
>();

export const deleteNotify = createAsyncAction(['@deleteNotifyRequest', '@deleteNotifySuccess', '@deleteNotifyFailure'])<
  { endpoint: 'notifications'; id: number; seen: boolean },
  { id: number; seen: boolean },
  string
>();

export const useGetNotificationsRequest = createDispatchAction(getNotifications.request);

export const usePostNotifyRequest = createDispatchAction(postNotify.request);

export const useDeleteNotifyRequest = createDispatchAction(deleteNotify.request);
