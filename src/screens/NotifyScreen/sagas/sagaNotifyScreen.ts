import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { getNotifications, postNotify, deleteNotify } from '../actions/actionNotifications';
import { Notifications } from 'api/Notifications';
import { takeLatest, put, call } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

function* handleGetNotications({ payload }: ReturnType<typeof getNotifications.request>) {
  try {
    const res: AxiosResponse<Notifications> = yield call(fetchAPI.request, {
      url: payload.endpoint,
      params: payload.params,
    } as AxiosRequestConfig);
    yield put(getNotifications.success(res.data));
  } catch (err) {
    console.log(err);
    yield put(getNotifications.failure('Error'));
  }
}

function* watchGetNotifications() {
  yield takeLatest(getActionType(getNotifications.request), handleGetNotications);
}

function* handlePostNotify({ payload }: ReturnType<typeof postNotify.request>) {
  try {
    yield call(fetchAPI.request, {
      method: 'POST',
      url: `${payload.endpoint}/${payload.id}`,
    } as AxiosRequestConfig);
    yield put(postNotify.success({ id: payload.id }));
  } catch (err) {
    console.log(err.response);
    yield put(postNotify.failure('Error'));
  }
}

function* watchPostNotify() {
  yield takeLatest(getActionType(postNotify.request), handlePostNotify);
}

function* handleDeleteNotify({ payload }: ReturnType<typeof deleteNotify.request>) {
  try {
    yield call(fetchAPI.request, {
      method: 'DELETE',
      url: `${payload.endpoint}/${payload.id}`,
    } as AxiosRequestConfig);
    yield put(deleteNotify.success({ id: payload.id }));
  } catch (err) {
    console.log(err.response);
    yield put(deleteNotify.failure('Error'));
  }
}

function* watchDeleteNotify() {
  yield takeLatest(getActionType(deleteNotify.request), handleDeleteNotify);
}

const sagaNotifyScreen = [watchGetNotifications, watchPostNotify, watchDeleteNotify];

export default sagaNotifyScreen;
