import { createAsyncAction, createDispatchAsyncAction } from 'utils/functions/reduxActions';
import { NotificationTotalEndpoint } from 'api/Endpoint';
import { NotificationTotal } from 'api/Notifications';

export const getNotificationTotal = createAsyncAction([
  '@getNotificationTotalRequest',
  '@getNotificationTotalSuccess',
  '@getNotificationTotalFailure',
])<{ endpoint: NotificationTotalEndpoint }, { data: NotificationTotal }, { message: string }>();

export const useGetNotificationTotal = createDispatchAsyncAction(getNotificationTotal);
