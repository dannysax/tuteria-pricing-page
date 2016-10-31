import React from 'react';
import ReactDOM from 'react-dom';
import { AutoAffix } from 'react-overlays';
import { Provider } from 'react-redux';
import App from './Sidebar';
import { throttle } from 'lodash';
// import { loadState, saveState } from '../localStorage';
import configureStore from '../store';

const store = configureStore();
const Root = () => (
      <Provider store={store} >
      <App />
      </Provider>

  );


export default Root