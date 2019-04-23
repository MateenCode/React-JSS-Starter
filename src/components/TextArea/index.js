import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

const styles = theme => ({
    root: {
      ...theme.textField,
      flexGrow: 1,
    },
    label: {...theme.label},
    errorText: {...theme.errorText},
    input: {
      ...theme.input,
      resize: 'none',
      minHeight: 90,
    },
    noValid: {...theme.noValid}
});

class TextArea extends React.PureComponent{

  state = {
    isRequired: false,
  }

  onBlur = () => {this.setState({ isRequired: this.props.required })}

  render(){
    const { label, style, classes, disabled, className, onChange, value, additionalInputProps, placeholder, autoComplete } = this.props;
    return(
      <div className={cx(classes.root, className)}>
        {label && <span className={classes.label}>{label}</span>}
        <textarea
          value={value}
          disabled={disabled}
          onBlur={()=> this.onBlur()}
          autoComplete={autoComplete}
          className={cx(classes.input, `${this.state.isRequired && !value ? classes.noValid : ''}`)}
          onChange={onChange}
          style={style}
          placeholder={placeholder}
          {...additionalInputProps}
        />
        {(this.state.isRequired === true && !value) && <span className={classes.errorText}>This is a required field</span>}
      </div>
    )
  }
}

export default withStyles(styles)(TextArea);
