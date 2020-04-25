import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { getPostComment } from 'containers/CommentScreen/actions/actionComments';
import CommentsScreen from 'containers/CommentScreen/CommentsScreen';

function mapStateToProps(state: AppState) {
  return {
    comments: state.postComments,
  };
}

const mapDispatchToProps = {
  getComments: getPostComment.request,
};

export type CommentsScreenProps = Connect<typeof mapStateToProps, typeof mapDispatchToProps>;

const CommentsScreenContainer: ReactNode = connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
export default CommentsScreenContainer;
