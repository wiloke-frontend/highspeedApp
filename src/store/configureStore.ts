import { Middleware, createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import rootSaga from 'store/rootSagas';
import rootReducers from 'store/rootReducers';
import { translations } from 'translations';
import { locale } from 'utils/functions/getCurrentLocale';

const persistConfig: PersistConfig<(keyof Reducers)[]> & { whitelist: (keyof Reducers)[] } = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'homeSkeleton',
    'homeSections',
    'homeSectionNavigations',
    'homeSectionYoutubeList',
    'postDetails',
    'postDetailRelatedPosts',
    'tabNavigator',
    'nightMode',
    'categoriesSelected',
    'auth',
    'postDetailTutorial',
    'postTextSize',
  ],
};

const _combineReducers = combineReducers({
  ...rootReducers,
  i18n: i18nReducer,
});

const sagaMiddleware = createSagaMiddleware();
const reducers = persistReducer(persistConfig as any, _combineReducers);
const middlewares: Middleware[] = [sagaMiddleware];
if (__DEV__) {
  middlewares.push(logger);
}

const store = createStore(reducers, undefined, compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

if (translations) {
  syncTranslationWithStore(store);
  store.dispatch({
    type: '@@i18n/LOAD_TRANSLATIONS',
    translations,
  });
  store.dispatch({
    type: '@@i18n/SET_LOCALE',
    locale: Object.keys(translations).includes(locale) ? locale : 'en',
  });
}

export type Reducers = ReturnType<typeof _combineReducers>;

export { store, persistor };
