import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { changePostDetailTutorial } from 'screens/PostDetailScreen/actions/actionPostDetail';

type PostDetailTutorialAction = ActionTypes<typeof changePostDetailTutorial>;

export const postDetailTutorial = createReducer<boolean, PostDetailTutorialAction>(true, [
  handleAction('@changePostDetailTutorial', state => !state),
]);
