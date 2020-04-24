import { ActionTypes, createReducer, handleAction } from 'utils/functions/reduxActions';
import { forgetPassword } from '../actions/actionPassword';

type ForgetPasswordAction = ActionTypes<typeof forgetPassword>;
interface ForgetPassState {
  status: string;
  message: string;
}

const initialState: ForgetPassState = {
  status: '',
  message: '',
};

export const forgetPass = createReducer<ForgetPassState, ForgetPasswordAction>(initialState, [
  handleAction('@forgetPasswordRequest', (state, _action) => ({
    ...state,
    status: 'loading',
    message: '',
  })),
  handleAction('@forgetPasswordSuccess', (state, action) => ({
    ...state,
    status: 'success',
    message: action.payload,
  })),
  handleAction('@forgetPassWordFailure', (state, action) => ({
    ...state,
    status: 'failure',
    message: action.payload,
  })),
]);
