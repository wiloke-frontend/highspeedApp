import watchSearchMounted from 'screens/SearchScreen/sagas/watchSearchMounted';
import watchTrendingPosts from 'screens/SearchScreen/sagas/watchTrendingPosts';
import watchSearchChange from 'screens/SearchScreen/sagas/watchSearchChange';

const sagaSearchScreen = [watchSearchMounted, watchTrendingPosts, watchSearchChange];

export default sagaSearchScreen;
