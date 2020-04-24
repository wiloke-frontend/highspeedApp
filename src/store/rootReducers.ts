import { categories } from 'store/storeCategories/reducers/reducerCategories';
import { categoriesSelected } from './storeCategories/reducers/reducerCatSelected';
import reducerAppContainer from 'screens/AppContainer/reducers/reducers';
import reducerAuthContainer from 'screens/AuthContainer/reducers/reducers';
import reducerCommentScreen from 'screens/CommentScreen/reducers/reducers';
import reducerHomeScreen from 'screens/HomeScreen/reducers/reducers';
import reducerMenuScreen from 'screens/MenuScreen/reducers/reducers';
import reducerNotifyScreen from 'screens/NotifyScreen/reducers/reducers';
import reducerPostDetailScreen from 'screens/PostDetailScreen/reducers/reducers';
import reducerPostsScreen from 'screens/PostsScreen/reducers/reducers';
import reducerProfileScreen from 'screens/ProfileScreen/reducers/reducers';
import reducerSearchScreen from 'screens/SearchScreen/reducers/reducers';
import reducerSelectCatScreen from 'screens/SelectCatScreen/reducers/reducers';

const reducers = {
  categories,
  categoriesSelected,
  ...reducerAppContainer,
  ...reducerAuthContainer,
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
