import { call, put, select, takeLeading } from 'redux-saga/effects';
import { Comment } from 'api/Comment';
import fetchAPI from 'utils/functions/fetchAPI';
import { AxiosResponse } from 'axios';
import { getActionType } from 'utils/functions/reduxActions';
import { Authentication } from 'store/storeAuth/actions/actionAuth';
import { addNewReplyOffline, AddReplySuccess, deleteReplyOffline, addNewReply } from 'screens/CommentScreen/actions/actionReplyComents';
import { getChildComment } from 'screens/CommentScreen/actions/actionComments';

function* handleAddNewReply({ payload }: ReturnType<typeof addNewReply.request>) {
  const auth: Authentication = yield select((state: AppState) => state.auth);
  const reply: Comment = {
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
    if (payload.body.id) {
      yield put(addNewReplyOffline(reply));
    }
    payload?.cb?.();
    const res: AxiosResponse<AddReplySuccess> = yield call(fetchAPI.request, {
      method: 'POST',
      url: payload.endpoint,
      data: { ...payload.body },
      params: {
        ...payload.params,
      },
    });
    yield put(deleteReplyOffline(reply.id));
    yield put(addNewReply.success({ status: res.data.status, data: res.data.data }));
    const newReply: Comment[] = yield select((state: AppState) => state.replyComments.data);
    const childComments = newReply.filter((_, index) => index < 3);
    const childCommentTotal = newReply.length;
    yield put(getChildComment({ childComments, childCommentTotal, parentID: payload.body.parentID }));
  } catch (err) {
    console.log(err);
    // yield put(deleteReplyOffline(reply.id));
    yield put(addNewReply.failure('Sorry your reply is not added'));
    yield put(addNewReplyOffline({ ...reply, approved: 'failure' }));
  }
}

function* watchAddNewReply() {
  yield takeLeading(getActionType(addNewReply.request), handleAddNewReply);
}
export default watchAddNewReply;
