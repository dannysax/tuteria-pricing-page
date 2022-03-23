import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

/*import { createStore, applyMiddleWare, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  hours,
  weeks,
  noOfStudents,
  priceFactor,
  priceOptions,
  subject,
  pricingDeterminant,
  processingFee,
  referral,
} from './reducers'*/



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
   //store.subscribe(throttle(() => {
     //saveState(
       //store.getState()
     //);
   //}, 1000));
  return store;
}

export default configureStore()

/*/Migrating from redux-saga to redux-toolkit
//-----Store Setup---//
const middleware = [thunk]

const initialState = {}



const store = createStore(reducers, initialState,
  composeWithDevTools(applyMiddleWare(...middleware)));
  export default store;*/