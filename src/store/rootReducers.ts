import { categories } from 'store/storeCategories/reducers/reducerCategories';
import { categoriesSelected } from './storeCategories/reducers/reducerCatSelected';
import reducerAppContent from 'containers/AppContent/reducers/reducers';
import reducerAuth from 'containers/Auth/reducers/reducers';
import reducerCommentScreen from 'containers/CommentScreen/reducers/reducers';
import reducerHomeScreen from 'containers/HomeScreen/reducers/reducers';
import reducerMenuScreen from 'containers/MenuScreen/reducers/reducers';
import reducerNotifyScreen from 'containers/NotifyScreen/reducers/reducers';
import reducerPostDetailScreen from 'containers/PostDetailScreen/reducers/reducers';
import reducerPostsScreen from 'containers/PostsScreen/reducers/reducers';
import reducerProfileScreen from 'containers/ProfileScreen/reducers/reducers';
import reducerSearchScreen from 'containers/SearchScreen/reducers/reducers';
import reducerSelectCatScreen from 'containers/SelectCatScreen/reducers/reducers';

const reducers = {
  categories,
  categoriesSelected,
  ...reducerAppContent,
  ...reducerAuth,
  ...reducerCommentScreen,
  ...reducerHomeScreen,
  ...reducerMenuScreen,
  ...reducerNotifyScreen,
  ...reducerPostDetailScreen,
  ...reducerPostsScreen,
  ...reducerProfileScreen,
  ...reducerSearchScreen,
  ...reducerSelectCatScreen,
};

export default reducers;
