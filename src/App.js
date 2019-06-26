import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router"; // react-router v4
import { fetchUser } from "./Store/Global/security";
import Home from "./Home";
import Login from "./Login";
import Header from "./Shared/Components/Header";

import "antd/dist/antd.css";

class App extends PureComponent {
  requireAuth(RenderComponent) {
    const {
      user,
      history: { push }
    } = this.props;
    if (!user) {
      this.props.fetchUser(push);
      return <div />;
    }
    return <RenderComponent />;
  }
  render() {
    return (
      <>
        <Route path="/" component={Header} />
        <Route exact path="/" render={() => this.requireAuth(Home)} />
        <Route exact path="/login" component={Login} />
      </>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: state.global.security.user
    }),
    { fetchUser }
  )(App)
);
