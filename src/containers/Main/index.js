import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

import { TextField, Button, Checkbox } from "components";

const styles = theme => ({
  root: {
    borderRadius: 6,
    boxShadow: theme.shadow,
    backgroundColor: theme.white,
    maxWidth: 450,
    margin: "0 auto",
    position: "relative",
    top: 50
  },
  loginHeader: {
    borderBottom: `1px solid ${theme.borderColor}`
  },
  imageBlock: {
    height: 150
  },
  h3: {
    paddingLeft: 80,
    fontSize: "1.8rem",
    position: "relative",
    paddingBottom: 10
  },
  h3_span: {
    backgroundColor: theme.buttonColor,
    width: 32,
    height: 7,
    borderRadius: 2,
    display: "block",
    position: "absolute",
    bottom: "-4px"
  },
  hr: {
    margin: 0
  },
  loginBody: {
    padding: "20px 80px 0"
  },
  firstTextField: {
    paddingBottom: 0
  },
  loginFooter: {
    padding: "20px 80px 30px"
  },
  button: {
    alignSelf: "flex-start"
  },
  checkBox: {
    paddingTop: 0
  },
  haveNotAccount: {
    color: theme.buttonColor,
    cursor: "pointer",
    alignSelf: "flex-end",
    "&:hover": {
      color: theme.linkHoverColor,
      textDecoration: "underline"
    }
  }
});

class Main extends React.PureComponent {
  state = {
    user: {
      username: "",
      password: ""
    },
    rememberMe: 0
  };

  onChange = event =>
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value }
    });

  onChecked = event =>
    this.setState({ rememberMe: event.target.checked ? 1 : 0 });

  render() {
    const { classes } = this.props;
    return (
      <div className="Main">
        <div className={cx(classes.root, "animated bounceInDown")}>
          <div className={classes.loginHeader}>
            <div className={cx(classes.imageBlock, "flexible aCenter jCenter")}>
              <img
                src="https://imsba.s3.amazonaws.com/themes/static/46722096/img/logo-big.png"
                alt="serve"
              />
            </div>
            <h3 className={classes.h3}>
              Login Form
              <span className={classes.h3_span} />
            </h3>
          </div>
          <div className={classes.loginBody}>
            <div className="flexible">
              <TextField
                name="username"
                label="Username"
                placeholder="Enter your username"
                required
                value={this.state.user.username}
                onChange={this.onChange}
                className={cx(classes.firstTextField, "flexible grow aStart")}
              />
            </div>
            <div className="flexible">
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={this.state.user.password}
                onChange={this.onChange}
                className="flexible grow aStart"
              />
            </div>
            <hr className={classes.hr} />
          </div>
          <div className={cx(classes.loginFooter, "flexible aStart")}>
            <Button text="Log me in" className={classes.button} />
            <div className="flexible vertical grow">
              <Checkbox
                label="Remember Me"
                id="rememberMe"
                onChange={this.onChecked}
                value={this.state.rememberMe}
                className={classes.checkBox}
              />
              <span className={classes.haveNotAccount}>
                Don't have an account?
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    null
  )
)(Main);
