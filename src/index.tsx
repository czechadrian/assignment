import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import loggerMiddleware from "./middleware/logger";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./app/reducers";
import "./index.css";

const middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composeEnv =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line @typescript-eslint/no-explicit-any

const store = createStore(rootReducer, undefined, composeEnv(middlewares));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
