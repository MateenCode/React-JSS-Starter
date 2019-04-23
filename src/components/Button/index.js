import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = theme => ({
  root: {
    backgroundColor: theme.buttonColor,
    color: theme.white,
    fontWeight: 400,
    lineHeight: 1,
    padding: theme.defaultPadding,
    borderColor: theme.buttonColor,
    borderRadius: 4,
    fontSize: "0.9rem",
    outline: "none",
    height: 30,
    cursor: "pointer",
    alignSelf: "center",
    transition:
      "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out",
    "&:hover": {
      backgroundColor: theme.buttonHoverColor,
      borderColor: theme.buttonHoverColor
    },
    "&.disabled": {
      backgroundColor: theme.disabledColor,
      borderColor: theme.white,
      color: theme.disabledTextColor,
      cursor: "not-allowed"
    }
  }
});

class Button extends React.PureComponent {
  render() {
    const {
      disabled,
      text,
      onClick,
      children,
      classes,
      className
    } = this.props;
    return (
      <button
        className={cx(classes.root, `${disabled ? "disabled" : ""}`, className)}
        disabled={disabled}
        onClick={onClick}
      >
        {text || children}
      </button>
    );
  }
}

export default withStyles(styles)(Button);
