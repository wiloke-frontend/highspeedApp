import { call, put, select, takeLeading } from 'redux-saga/effects';
import { postNewComment, postNewCommentOffline, PostNewCommentSuccess, deleteCommentOffline } from '../../actions/actionComments';
import { Authentication } from 'containers/Auth/actions/actionAuth';
import { Comment } from 'api/Comment';
import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse } from 'axios';
import { getActionType } from 'utils/functions/reduxActions';

function* handleAddComment({ payload }: ReturnType<typeof postNewComment.request>) {
  const auth: Authentication = yield select((state: AppState) => state.auth);
  const comment: Comment = {
    id: payload.body.id ?? Date.now(),
    title: '',
    author: {
      id: auth.data.id ?? Date.now(),
      displayName: auth.data.displayName ?? '',
      avatar: auth.data.avatar ?? '',
      email: auth.data.email ?? '',
    },
    description: payload.body.comment,
    childComments: [],
    childCommentTotal: 0,
    timestamp: Date.now() / 1000,
    date: '',
  };
  try {
    if (!payload.body.id) {
      yield put(postNewCommentOffline(comment));
    }
    payload?.cb?.();
    const res: AxiosResponse<PostNewCommentSuccess> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: { ...payload.body },
    });
    yield put(deleteCommentOffline(comment.id));
    yield put(postNewComment.success({ status: res.data.status, data: res.data.data }));
  } catch (err) {
    console.log(err.response);
    // yield put(deleteCommentOffline(comment.id));
    yield put(postNewComment.failure('Sorry your comment is not added'));
    yield put(postNewCommentOffline({ ...comment, approved: 'failure' }));
  }
}

function* watchAddNewComment() {
  yield takeLeading(getActionType(postNewComment.request), handleAddComment);
}
export default watchAddNewComment;
