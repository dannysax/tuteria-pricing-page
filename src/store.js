import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export function configureStore() {
  const persistentState = window.__REDUX_STATE__;
  // loadState();
  const sagaMiddleware = createSagaMiddleware();
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  if (process.env.NODE_ENV === 'production') {
    composeEnhancers = compose;
  }
  const store = createStore(
    reducers,
    persistentState,
    composeEnhancers(
      applyMiddleware(thunk, sagaMiddleware)
    )

  );
  sagaMiddleware.run(rootSaga);
  // store.subscribe(throttle(() => {
  //   saveState(
  //     store.getState()
  //   );
  // }, 1000));
  return store;
}

export default configureStore()