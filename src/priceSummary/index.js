import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./Sidebar";
import { throttle } from "lodash";
// import { loadState, saveState } from '../localStorage';
import store from "../store";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
