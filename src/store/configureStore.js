import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import createLogger from 'redux-logger';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant(), createLogger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
