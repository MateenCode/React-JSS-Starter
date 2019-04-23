import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = theme => ({
  root: { ...theme.textField },
  label: { ...theme.label },
  errorText: { ...theme.errorText },
  input: { ...theme.input },
  noValid: { ...theme.noValid }
});

class NumericTextField extends React.PureComponent {
  state = {
    isRequired: false,
    isValid: false
  };

  onBlur = () => {
    this.setState({ isRequired: this.props.required });
  };

  isModifierKey = event => {
    const key = event.keyCode;
    return (
      event.shiftKey === true ||
      key === 35 ||
      key === 36 || // Allow Shift, Home, End
      (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      // Allow Ctrl/Command + A,C,V,X,Z
      ((event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
    );
  };

  formatToPhone = event => {
    if (this.isModifierKey(event)) {
      return;
    }

    // I am lazy and don't like to type things more than once
    const input = event.target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
      return `(${zip}) ${middle} - ${last}`;
    } else if (input.length > 3) {
      return `(${zip}) ${middle}`;
    } else if (input.length > 0) {
      return `(${zip}`;
    }
  };

  onChange = val => {
    this.props.onChange(this.formatToPhone(val));

    if (this.formatToPhone(val) && this.formatToPhone(val).length < 16) {
      this.setState({ isValid: true, isRequired: true });
    } else {
      this.setState({ isValid: false, isRequired: false });
    }
  };

  render() {
    const {
      type,
      classes,
      label,
      style,
      disabled,
      className,
      value,
      additionalInputProps,
      placeholder,
      autoComplete
    } = this.props;
    return (
      <div className={cx(classes.root, className)}>
        {label && <span className={classes.label}>{label}</span>}
        <input
          type={type}
          value={value}
          disabled={disabled}
          onBlur={() => this.onBlur()}
          autoComplete={autoComplete}
          className={cx(
            classes.input,
            `${
              (this.state.isRequired && value.length < 16) ||
              this.state.islValid
                ? classes.noValid
                : ""
            }`
          )}
          onChange={e => this.onChange(e)}
          style={style}
          placeholder={placeholder}
          {...additionalInputProps}
        />
        {this.state.isRequired === true && !value && (
          <span className={classes.errorText}>This is a required field</span>
        )}
        {this.state.isValid && (
          <span className={classes.errorText}>
            Please provide a 10 digit number
          </span>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NumericTextField);
