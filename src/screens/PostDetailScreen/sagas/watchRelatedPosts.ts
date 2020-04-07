import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getActionType } from 'utils/functions/reduxActions';
import { getRelatedPosts } from 'screens/PostDetailScreen/actions/actionPostDetail';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { RelatedPosts } from 'api/RelatedPosts';
import { PLUCK } from 'utils/constants/constants';

function* handleRelatedPosts({ payload }: ReturnType<typeof getRelatedPosts.request>) {
  try {
    const res: AxiosResponse<RelatedPosts> = yield call(fetchAPI.request, {
      url: `post/${payload.endpoint}/related-posts`,
      params: {
        postType: 'post',
        numberOfPosts: 6,
        pluck: PLUCK,
      },
    });
    yield put(getRelatedPosts.success({ data: res.data, endpoint: payload.endpoint }));
  } catch (err) {
    yield put(getRelatedPosts.failure({ message: 'Error', endpoint: payload.endpoint }));
  }
}

export default function* watchRelatedPosts() {
  while (true) {
    const actionGetRelatedPostsRequest: ReturnType<typeof getRelatedPosts.request> = yield take(getActionType(getRelatedPosts.request));
    const getRelatedPostsTask = yield fork(handleRelatedPosts, actionGetRelatedPostsRequest);
    const actionGetRelatedPostsCancel: ReturnType<typeof getRelatedPosts.cancel> = yield take(getActionType(getRelatedPosts.cancel));
    if (actionGetRelatedPostsCancel.type === '@getRelatedPostsCancel') {
      yield cancel(getRelatedPostsTask);
    }
  }
}
