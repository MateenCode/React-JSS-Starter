import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = theme => ({
  root: {
    padding: 10,
    backgroundColor: theme.white,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    width: 10,
    height: 10,
    borderRadius: "100%",
    backgroundColor: theme.buttonColor,
    margin: "0 5px"
  },
  item1: {
    animationDelay: "200ms"
  },
  item2: {
    animationDelay: "300ms"
  },
  item3: {
    animationDelay: "400ms"
  }
});

class Loading extends React.PureComponent {
  render() {
    const { classes, className } = this.props;
    return (
      <div className={cx(classes.root, className)}>
        <div className={cx(classes.item1, classes.item, "typing")} />
        <div className={cx(classes.item2, classes.item, "typing")} />
        <div className={cx(classes.item3, classes.item, "typing")} />
      </div>
    );
  }
}

export default withStyles(styles)(Loading);
