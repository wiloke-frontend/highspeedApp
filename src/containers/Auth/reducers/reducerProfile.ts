import { ActionTypes, createReducer } from 'utils/functions/reduxActions';
import { getProfile } from '../actions/actionAuth';
import { UserProfile } from 'api/User';
import { handleAsyncAction } from 'utils/functions/reduxActions/helpers';

type UserProfileAction = ActionTypes<typeof getProfile>;

type UserProfileState = ReducerState<UserProfile>;

const initialState: UserProfileState = {
  status: 'loading',
  data: {
    id: 0,
    displayName: '',
    avatar: '',
    userName: '',
    email: '',
  },
  message: '',
};

const profileUser = createReducer<UserProfileState, UserProfileAction>(
  initialState,
  handleAsyncAction(['@getProfileRequest', '@getProfileSuccess', '@getProfileFailure']),
);
export default profileUser;
