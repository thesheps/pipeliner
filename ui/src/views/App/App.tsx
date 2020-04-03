import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { APP_NAME } from "../../constants";
import { NavBarContainer } from "../../components/NavBar";
import { rootReducer } from "../../store/rootReducer";

export const App = () => (
  <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
    <NavBarContainer appName={APP_NAME} />
  </Provider>
);
