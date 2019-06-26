import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./Store";
import App from "./App";

class Providers extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Providers;
