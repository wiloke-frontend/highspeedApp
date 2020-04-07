import { call, select, takeLatest, put } from 'redux-saga/effects';
import { authentication, Authentication } from '../actions/actionAuth';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getActionType } from 'utils/functions/reduxActions';

function* handleAuthen({ payload }: ReturnType<typeof authentication.request>) {
  try {
    const res: AxiosResponse<Authentication> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: { ...payload.body },
    } as AxiosRequestConfig);
    yield put(authentication.success(res.data));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth, { ...payload.body });
  } catch (err) {
    console.log(err.response);
    yield put(authentication.failure('Something went to error'));
    const auth: Authentication = yield select((state: AppState) => state.auth);
    payload?.cb?.(auth, { ...payload.body });
  }
}

function* watchAuth() {
  yield takeLatest(getActionType(authentication.request), handleAuthen);
}

export default watchAuth;
