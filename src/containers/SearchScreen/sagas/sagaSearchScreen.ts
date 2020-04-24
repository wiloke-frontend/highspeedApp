import watchSearchMounted from 'containers/SearchScreen/sagas/watchSearchMounted';
import watchTrendingPosts from 'containers/SearchScreen/sagas/watchTrendingPosts';
import watchSearchChange from 'containers/SearchScreen/sagas/watchSearchChange';

const sagaSearchScreen = [watchSearchMounted, watchTrendingPosts, watchSearchChange];

export default sagaSearchScreen;
