import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { changePostTextSize } from 'screens/PostDetailScreen/actions/actionPostDetail';
import { TextSize } from 'components/FontSizeConfig/FontSizeConfig';

type PostTextSizeAction = ActionTypes<typeof changePostTextSize>;

const initialState: TextSize = 'small';

export const postTextSize = createReducer<TextSize, PostTextSizeAction>(initialState, [
  handleAction('@changePostTextSize', (_state, action) => action.payload.size),
]);
