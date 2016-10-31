import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const p = [
  {
    heading: "Regular",
    perHour: 20000,
    selected: true,
  },
  {
    heading: "Expert",
    perHour: 45000,
    selected: false,
  },
  {
    heading: "Elite",
    perHour: 60000,
    selected: false, 
  }
];

export default function configureStore() {
  const persistentState = {
      priceOptions:p,
      subject:""
  }
  // loadState();
  const logger = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
        reducers,
        persistentState,
        composeEnhancers(
          applyMiddleware(thunk, logger, sagaMiddleware)
        )
        
    );
sagaMiddleware.run(rootSaga)
  // store.subscribe(throttle(() => {
  //   saveState(
  //     store.getState()
  //   );
  // }, 1000));
  return store;
}
