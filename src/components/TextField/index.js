import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

const styles = theme => ({
    root: {...theme.textField},
    label: {...theme.label},
    errorText: {...theme.errorText},
    input: {...theme.input},
    noValid: {...theme.noValid}
});

class TextField extends React.PureComponent{

  state = {
    isRequired: false,
    isEmailValid: true,
  }

  onBlur = () => {this.setState({ isRequired: this.props.required })};

  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  onChange = (e) => {
    this.props.onChange(e);
    if(this.props.email) {
      if(this.emailIsValid(e.target.value) || e.target.value.length < 1) {
        this.setState({ isEmailValid: true })
      } else {
        this.setState({ isEmailValid: false })
      }
    }
  }

  render(){
    const { type, classes, email, name, label, style, disabled, className, value, additionalInputProps, placeholder, autoComplete } = this.props;
    return(
      <div className={cx(classes.root, className)}>
        {label && <span className={classes.label}>{label}</span>}
        <input
          type={type}
          value={value}
          disabled={disabled}
          name={name}
          onBlur={()=> this.onBlur()}
          autoComplete={autoComplete}
          className={cx(classes.input, `${(this.state.isRequired && !value) || (!this.state.isEmailValid && email) ? classes.noValid : ''}`)}
          onChange={(e) => this.onChange(e)}
          style={style}
          placeholder={placeholder}
          {...additionalInputProps}
        />
        {(this.state.isRequired === true && !value) && <span className={classes.errorText}>This is a required field</span>}
        {!this.state.isEmailValid && email && <span className={classes.errorText}>Email Invalid</span>}
      </div>
    )
  }
}

export default withStyles(styles)(TextField);
