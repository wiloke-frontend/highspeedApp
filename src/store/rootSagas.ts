import { all, delay, call, spawn } from 'redux-saga/effects';
import sagaPostDetailScreen from 'containers/PostDetailScreen/sagas/sagaPostDetailScreen';
import sagaSearchScreen from 'containers/SearchScreen/sagas/sagaSearchScreen';
import sagaHomeScreen from 'containers/HomeScreen/sagas/sagaHomeScreen';
import sagaSelectedCatScreen from 'containers/SelectCatScreen/sagas/sagaSelectedCatScreen';
import sagaPostsScreen from 'containers/PostsScreen/sagas/sagaPostsScreen';
import sagaNotifyScreen from 'containers/NotifyScreen/sagas/sagaNotifyScreen';
import { sagaComments, sagaReply } from 'containers/CommentScreen/sagas';
import sagaAuth from 'containers/Auth/sagas/sagaAuth';
import sagaCategories from './storeCategories/sagas/sagaCategories';
import sagaAppContent from 'containers/AppContent/sagas/sagaAppContent';
import sagaMenuScreen from 'containers/MenuScreen/sagas/sagaMenuScreen';

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
  ...sagaAppContent,
  ...sagaMenuScreen,
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
