import { ActionTypes, createReducer, handleAction } from 'utils/functions/reduxActions';
import { authentication, Authentication, logout, loginApple, loginFacebook, refreshToken, changePassword } from 'store/storeAuth/actions/actionAuth';

type AuthenticationAction = ActionTypes<
  typeof authentication | typeof logout | typeof loginApple | typeof loginFacebook | typeof refreshToken | typeof changePassword
>;

type AuthenticationState = Authentication & {
  statusApple: string;
  statusFacebook: string;
  statusChangePassword: string;
};

const initialState: AuthenticationState = {
  data: {
    msg: '',
    redirectTo: '',
    accessToken: '',
    refreshToken: '',
  },
  status: '',
  isLoggedIn: false,
  message: '',
  statusApple: '',
  statusFacebook: '',
  statusChangePassword: '',
};

export const auth = createReducer<AuthenticationState, AuthenticationAction>(initialState, [
  handleAction('@authRequest', state => ({
    ...state,
    status: 'loading',
    isLoggedIn: false,
  })),
  handleAction('@authSuccess', (state, action) => {
    return {
      ...state,
      status: action.payload.status,
      data: action.payload.data,
      isLoggedIn: !!action?.payload?.data?.accessToken,
    };
  }),
  handleAction('@authFailure', (state, action) => {
    return {
      ...state,
      status: 'failure',
      message: action.payload,
      isLoggedIn: false,
    };
  }),
  handleAction('@logout', () => {
    return initialState;
  }),
  handleAction('@loginAppleRequest', (state, _action) => ({
    ...state,
    statusApple: 'loading',
    isLoggedIn: false,
  })),
  handleAction('@loginAppleSuccess', (state, action) => ({
    ...state,
    statusApple: 'success',
    data: action.payload.data,
    isLoggedIn: !!action?.payload?.data?.accessToken,
  })),
  handleAction('@loginAppleFailure', (state, action) => ({
    ...state,
    statusApple: 'failure',
    message: action.payload,
  })),
  handleAction('@loginFacebookRequest', (state, _action) => ({
    ...state,
    statusFacebook: 'loading',
    isLoggedIn: false,
  })),
  handleAction('@loginFacebookSuccess', (state, action) => ({
    ...state,
    statusFacebook: 'success',
    data: action.payload.data,
    isLoggedIn: !!action?.payload?.data?.accessToken,
  })),
  handleAction('@loginFacebookFailure', (state, action) => ({
    ...state,
    statusFacebook: 'failure',
    message: action.payload,
  })),
  handleAction('@renewToken', (state, action) => {
    state.data.accessToken = action.payload.accessToken;
    return state;
  }),
  handleAction('@changePasswordRequest', (state, _action) => ({
    ...state,
    statusChangePassword: 'loading',
  })),
  handleAction('@changePasswordSuccess', (state, action) => {
    state.statusChangePassword = 'success';
    state.data.accessToken = action.payload.data.accessToken;
    state.data.refreshToken = action.payload.data.refreshToken;
    return state;
  }),
  handleAction('@changePasswordFailure', (state, action) => ({
    ...state,
    statusChangePassword: 'failure',
    message: action.payload,
  })),
]);
