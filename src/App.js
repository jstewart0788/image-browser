import React, { PureComponent } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router"; // react-router v4
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./Store";
import Home from "./Home";
import Header from "./Shared/Components/Header";

import 'antd/dist/antd.css';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <>
            <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
          </>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;