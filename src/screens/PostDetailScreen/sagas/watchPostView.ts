import fetchAPI from 'utils/functions/fetchAPI';
import { postView } from '../actions/actionPostDetail';
import { AxiosRequestConfig } from 'axios';
import { take, fork, call, delay, put, cancel } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';

const ONE_MINUTE = 60000;

function* handlePostView({ payload }: ReturnType<typeof postView.request>) {
  try {
    yield delay(ONE_MINUTE);
    yield call(fetchAPI.request, {
      method: 'POST',
      url: `${payload.endpoint}/${payload.postID}`,
    } as AxiosRequestConfig);
    yield put(postView.success({ postEndpoint: payload.postEndpoint }));
  } catch {
    yield put(postView.failure(null));
  }
}

export default function* watchPostView() {
  while (true) {
    const actionPostViewRequest: ReturnType<typeof postView.request> = yield take(getActionType(postView.request));
    const postViewTask = yield fork(handlePostView, actionPostViewRequest);
    const actionPostViewCancel: ReturnType<typeof postView.cancel> = yield take(getActionType(postView.cancel));
    if (actionPostViewCancel.type === '@postViewCancel') {
      yield cancel(postViewTask);
    }
  }
}
