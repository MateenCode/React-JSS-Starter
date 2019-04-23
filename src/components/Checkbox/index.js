import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = theme => ({
  root: {
    padding: "1rem"
  },
  label: {
    cursor: "pointer",
    position: "relative",
    padding: "3px"
  },
  after: {
    width: 14,
    height: 14,
    border: "2px solid #dde2ec",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: theme.white,
    position: "absolute",
    top: 7,
    left: 1
  },
  before: {
    color: theme.white,
    fontSize: 13,
    position: "absolute",
    left: 5,
    zIndex: 1,
    top: 6
  },
  checked: {
    backgroundColor: theme.buttonColor,
    borderColor: theme.buttonColor
  },
  name: {
    marginLeft: 15
  }
});

class Checkbox extends React.PureComponent {
  render() {
    const {
      checked,
      value,
      onChange,
      name,
      label,
      id,
      classes,
      className
    } = this.props;
    return (
      <div className={cx(classes.root, className)}>
        <label className={classes.label} htmlFor={id}>
          <input
            type="checkbox"
            checked={checked}
            value={value}
            id={id}
            name={name}
            onChange={onChange}
          />
          {value === 1 && <span className={classes.before}>✓</span>}
          <span
            className={cx(classes.after, value === 1 ? classes.checked : "")}
          />
          <span className={classes.name}>{label}</span>
        </label>
      </div>
    );
  }
}

export default withStyles(styles)(Checkbox);
