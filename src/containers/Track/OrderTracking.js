import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

import { TextField, Button, Loading, Popup } from 'components';

const styles = theme => ({
    root: {
      padding: '20px 0',
    },
    onboardingTitle: {
      textAlign: 'center',
      fontSize: '1.8rem',
      zIndex: 0,
    },
    onboardingContent: {
      zIndex: 1,
      backgroundImage: 'url(https://imsba.s3.amazonaws.com/themes/static/46722096/img/onboarding-gradient-hor.png)',
      width: '100%',
      padding: '40px 50px 50px',
      boxSizing: 'border-box',
      backgroundSize: '100% auto',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
    },
    img: {
      width: 200,
      margin: '25px 0',
      zIndex: 0,
    },
    textField: {
      width: '100%',
    },
    firstTextfield: {
      paddingBottom: 0
    }
});

class OrderTracking extends React.PureComponent{

  state = {
    order_id: '',
    order_pin: '',
    isOpen: false,
  };

  componentDidMount(){
    this.setState({
      order_id: this.props.params.order_id || '',
      order_pin: this.props.params.order_pin || ''
    })
  }

  onChange = (event, key) => this.setState({ [key]: event.target.value });

  keyup = (event) => this.state.order_id.length > 0 && event.keyCode === 13 && this.props.onTakenOrder(this.state.order_id, this.state.order_pin);

  render(){
    const { classes } = this.props;
    return(
      <div className={cx(classes.root, 'flexible vertical jCenter aCenter')}>
        <div className="image-block flexible jCenter aCenter">
          <img src="https://imsba.com/files/websites/83/311/logos/logo1.png" className={cx(classes.img, 'animated zoomIn')} alt="Serve"/>
        </div>
        <h4 className={cx(classes.onboardingTitle, 'animated zoomIn')}>Order Tracking</h4>
        <div className={cx(classes.onboardingContent, 'flexible vertical jCenter aCenter')}>
          <TextField
            label="Order ID"
            placeholder="ID"
            type="text"
            onChange={(e)=> this.onChange(e, 'order_id')}
            value={this.state.order_id}
            required
            className={cx(classes.textField, classes.firstTextfield)}
            additionalInputProps= {{
              onKeyUp: this.keyup
            }}
          />
          <TextField
            label="Order Pin"
            placeholder="Pin"
            type="text"
            onChange={(e)=> this.onChange(e, 'order_pin')}
            value={this.state.order_pin}
            className={classes.textField}
            additionalInputProps= {{
              onKeyUp: this.keyup
            }}
          />
          <Button
            text="Track My Order"
            disabled={!this.state.order_id.length > 0}
            onClick={()=> this.props.onTakenOrder(this.state.order_id, this.state.order_pin)}
          />
        </div>
        { this.props.isBusy && <Loading/> }
        {
          this.props.isOpen &&
          <Popup
            onPopupClose={this.props.onTogglePopup}
            message={this.props.error.message}
          />
        }
      </div>
    )
  }
}

export default withStyles(styles)(OrderTracking);
