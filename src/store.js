import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const p = [
  {
    heading: "Regular",
    perHour: 1500,
    selected: false,
  },
  {
    heading: "Expert",
    perHour: 2000,
    selected: false,
  },
  {
    heading: "Elite",
    perHour: 2500,
    selected: false, 
  }
];

export function configureStore() {
  const days = ['Monday', "Tuesday", "Thursday", "Friday"]
  const persistentState = {
      priceOptions:p,
      subject:"",
      pricingDeterminant: {
        price_base_rate: 0.080,
        one_hour_less_price_rate: 1.250,
        hour_rate: 0.200,
        student_no_rate: 0.250
      },
      priceFactor: {
        no_of_students: 2,
        hours_per_day: 2,
        noOfDays: days.length,
        days: days,
        noOfWeeks: 4,
        discount: 0,
    },
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

export default configureStore()