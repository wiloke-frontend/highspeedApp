import { ActionTypes, createReducer, handleAction } from 'utils/functions/reduxActions';
import { getReplyComments, addNewReply, addNewReplyOffline, deleteReplyOffline, deleteReply, editReply } from '../actions/actionReplyComents';
import { Comments } from 'api/Comment';
import { getUniqueSet } from 'utils/functions/unique';

type ReplyCommentAction = ActionTypes<
  typeof getReplyComments | typeof addNewReply | typeof addNewReplyOffline | typeof deleteReplyOffline | typeof deleteReply | typeof editReply
>;

type ReplyCommentState = ReducerState<Comments['data']> & {
  statusAdd: string;
  messageAdd: string;
  statusDelete: string;
  messageDelete: string;
  statusEdit: string;
  messageEdit: string;
};
const initialState: ReplyCommentState = {
  data: [],
  status: 'loading',
  message: '',
  pageNext: 1,
  loadmoreStatus: 'loading',
  statusAdd: 'loading',
  messageAdd: '',
  statusDelete: 'loading',
  messageDelete: '',
  statusEdit: 'loading',
  messageEdit: '',
};

const replyComments = createReducer<ReplyCommentState, ReplyCommentAction>(initialState, [
  handleAction('@getReplyRequest', (state, action) => {
    return {
      ...state,
      status: action.payload.params.page === 1 ? 'loading' : 'success',
      pageNext: action.payload.params.page === 1 ? 1 : state.pageNext,
      loadmoreStatus: action.payload.params.page === 1 ? 'success' : 'loading',
    };
  }),
  handleAction('@getReplySuccess', (state, action) => {
    return {
      ...state,
      data: !!state.pageNext && state.pageNext > 1 ? [...state.data, ...action.payload.data] : action.payload.data,
      status: 'success',
      pageNext: !!action.payload?.pagination?.next ? action.payload.pagination.next?.params.page : 1,
      loadmoreStatus: 'success',
    };
  }),
  handleAction('@getReplyFailure', (state, action) => {
    return {
      ...state,
      status: state.pageNext === 1 ? 'failure' : 'success',
      message: action.payload,
      loadmoreStatus: 'failure',
    };
  }),
  handleAction('@addNewReplyRequest', (state, _action) => ({
    ...state,
    statusAdd: 'loading',
  })),
  handleAction('@addNewReplySuccess', (state, action) => ({
    ...state,
    statusAdd: 'success',
    data: [action.payload.data.comment, ...state.data],
  })),
  handleAction('@addNewReplyFailure', (state, action) => ({
    ...state,
    statusAdd: 'failure',
    messageAdd: action.payload,
  })),
  handleAction('@addNewReplyOffline', (state, action) => ({
    ...state,
    data: getUniqueSet([action.payload.comment, ...state.data], 'id'),
  })),
  handleAction('@deleteReplyOffline', (state, action) => ({
    ...state,
    data: state.data.filter(i => i.id !== action.payload.id),
  })),
  handleAction('@deleteReplyRequest', (state, _action) => {
    return {
      ...state,
      statusDelete: 'loading',
    };
  }),
  handleAction('@deleteReplySuccess', (state, action) => {
    return {
      ...state,
      statusDelete: 'success',
      data: state.data.filter(i => i.id !== action.payload.id),
      messageDelete: action.payload.msg,
    };
  }),
  handleAction('@deleteReplyFailure', (state, action) => ({
    ...state,
    statusDelete: 'failure',
    messageDelete: action.payload,
  })),
  handleAction('@editReplyRequest', (state, _action) => ({
    ...state,
    statusEdit: 'loading',
    messageEdit: '',
  })),
  handleAction('@editReplySuccess', (state, action) => {
    const newDescription = action.payload.data.comment?.description;
    return {
      ...state,
      statusEdit: 'success',
      messageEdit: 'Updated sucess',
      data: state.data.map(item => ({
        ...item,
        description: item.id === action.payload.data.id ? newDescription : item.description,
      })),
    };
  }),
  handleAction('@editReplyFailure', (state, action) => {
    return { ...state, statusEdit: 'failure', messageEdit: action.payload };
  }),
]);

export default replyComments;
