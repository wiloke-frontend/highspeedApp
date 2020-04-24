import { createReducer, ActionTypes, handleAction } from 'utils/functions/reduxActions';
import { changePostDetailTutorial } from 'containers/PostDetailScreen/actions/actionPostDetail';

type PostDetailTutorialAction = ActionTypes<typeof changePostDetailTutorial>;

export const postDetailTutorial = createReducer<boolean, PostDetailTutorialAction>(true, [
  handleAction('@changePostDetailTutorial', state => !state),
]);
