import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

import { Button } from "components";

const modalRoot = document.getElementById("modal_root");

const modalString =
  "position: fixed; width: 100%; height: 100%; top:0; left: 0;";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  overlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundColor: theme.overlayColor,
    top: 0,
    left: 0
  },
  popup_body: {
    boxShadow: theme.shadow,
    backgroundColor: theme.white,
    borderRadius: 6,
    overflow: "hidden",
    minHeight: 200,
    maxWidth: "50%",
    minWidth: 400,
    boxSizing: "border-box",
    padding: 40,
    zIndex: 1
  },
  button: {
    alignSelf: "flex-end"
  }
});

class Popup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
    this.el.className = "modal_content";
    this.el.setAttribute("style", modalString);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { classes } = this.props;
    return ReactDOM.createPortal(
      <div className={cx(classes.root, "flexible jCenter aCenter")}>
        <div className={classes.overlay} onClick={this.props.onPopupClose} />
        <div
          className={cx(
            classes.popup_body,
            "flexible vertical grow jBetween animated bounceInDown"
          )}
        >
          <span>{this.props.message || ""}</span>
          <Button className={classes.button} onClick={this.props.onPopupClose}>
            Close
          </Button>
        </div>
      </div>,
      this.el
    );
  }
}

export default withStyles(styles)(Popup);
