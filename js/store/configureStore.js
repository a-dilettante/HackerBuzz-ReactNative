import { createStore, applyMiddleware } from 'redux';

import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export default function configureStore(onComplete) {
  const store = autoRehydrate()(createStoreWithMiddleware)(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: [
        'comments',
        'tabMain',
        'tabAsk',
        'tabShow',
        'tabJob',
        'tabMore',
        'tabBar',
        'new',
        'top',
        'best',
        'ask',
        'show',
        'jobs'
      ]
    },
    onComplete
  );

  return store;
}
