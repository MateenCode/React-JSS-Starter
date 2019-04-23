import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, Switch, withRouter } from "react-router-dom";

import { Track, Main, Order } from "containers";

import "./App.scss";
import "./animate.css";

import { getWebsiteAssets } from "actions/websiteAssests";

class App extends PureComponent {
  componentDidMount() {
    this.props.getWebsiteAssets();
  }

  render() {
    return (
      <div style={{ minHeight: "100%", height: "100%" }}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/track" component={Track} />
          <Route exact path="/track/id=:order_id" component={Track} />
          <Route path="/track/id=:order_id/pin=:order_pin" component={Track} />
          <Route exact path="/order" component={Order} />
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    null,
    { getWebsiteAssets }
  )
)(App);
