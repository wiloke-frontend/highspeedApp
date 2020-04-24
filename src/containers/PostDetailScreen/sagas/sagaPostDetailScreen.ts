import watchDetailContent from './watchDetailContent';
import watchRelatedPosts from './watchRelatedPosts';
import { watchPostFavorite } from './watchPostFavorite';
import watchPostView from './watchPostView';
import { watchGetFavorite } from './watchGetFavorite';

const sagaPostDetailScreen = [watchDetailContent, watchGetFavorite, watchRelatedPosts, watchPostFavorite, watchPostView];

export default sagaPostDetailScreen;
