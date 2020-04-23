import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getNotificationTotal } from './actionNotificationTotal';
import { NotificationTotal } from 'api/Notifications';
import { takeLatest, put, call } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handleGetNotications({ payload }: ReturnType<typeof getNotificationTotal.request>) {
  try {
    const res: AxiosResponse<NotificationTotal> = yield call(fetchAPI.request, {
      url: payload.endpoint,
    } as AxiosRequestConfig);
    yield put(getNotificationTotal.success({ data: res.data }));
  } catch (err) {
    console.log(err.response);
    yield put(getNotificationTotal.failure({ message: 'Error' }));
  }
}

export default function* watchGetNotificationTotal() {
  yield takeLatest(getActionType(getNotificationTotal.request), handleGetNotications);
}
