import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import { APP_NAME } from "../../constants";
import { NavBarContainer } from "../../components/NavBar";
import { rootReducer } from "../../store/rootReducer";
import { ErrorContainer } from "../../components/Error";

// @ts-ignore TS2339
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const App = () => (
  <Provider store={store}>
    <NavBarContainer appName={APP_NAME} />
    <ErrorContainer />
  </Provider>
);
