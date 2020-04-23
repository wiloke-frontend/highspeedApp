import { all, delay, call, spawn } from 'redux-saga/effects';
import sagaPostDetailScreen from 'screens/PostDetailScreen/sagas/sagaPostDetailScreen';
import sagaSearchScreen from 'screens/SearchScreen/sagas/sagaSearchScreen';
import sagaHomeScreen from 'screens/HomeScreen/sagas/sagaHomeScreen';
import sagaSelectedCatScreen from 'screens/SelectCatScreen/sagas/sagaSelectedCatScreen';
import sagaPostsScreen from 'screens/PostsScreen/sagas/sagaPostsScreen';
import sagaNotifyScreen from 'screens/NotifyScreen/sagas/sagaNotifyScreen';
import { watchTabNavigator } from './storeTabNavigator/sagas';
import { watchMenu } from 'screens/MenuScreen/sagas/sagaMenu';
import { sagaComments, sagaReply } from 'screens/CommentScreen/sagas';
import sagaAuth from './storeAuth/sagas/sagaAuth';
import sagaCategories from './storeCategories/sagas/sagaCategories';
import watchGetNotificationTotal from './storeNotificationTotal/sagaNotificationTotal';

const sagas = [
  ...sagaHomeScreen,
  ...sagaSelectedCatScreen,
  ...sagaSearchScreen,
  ...sagaPostDetailScreen,
  ...sagaNotifyScreen,
  ...sagaComments,
  ...sagaReply,
  ...sagaAuth,
  ...sagaPostsScreen,
  ...sagaCategories,
  watchTabNavigator,
  watchMenu,
  watchGetNotificationTotal,
];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function*() {
    yield spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
