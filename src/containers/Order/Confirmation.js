import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

import { Button, Popup } from 'components';

const styles = theme => ({
    root: {
      boxShadow: theme.shadow,
      backgroundColor: theme.white,
      maxWidth:'80%',
      borderRadius: 6,
      paddingTop: 40,
    },
    imageBlock: {
      width: 200,
      margin: '25px 0',
      zIndex: 0,
    },
    onboardingTitle: {
      textAlign: 'center',
      fontSize: '1.8rem',
      zIndex: 0,
    },
    confirmationContent: {
      width: '100%',
      padding: '60px 50px',
      boxSizing: 'border-box',
    },
    h4: {
      fontSize: '1.8rem',
      color: theme.buttonColor,
    },
    h5: {
      color: theme.placeholderColor,
      letterSpacing: '.8px',
      fontWeight: 400,
      margin: '30px 0'
    },
    input: {
      transform: 'scale(0)',
    },
    strong: {
      fontSize: '.8rem',
      cursor: 'pointer',
    }
});

const mapStateToProps = ({ storeOrderInfo }) => ({ storeOrderInfo });

class Confirmation extends React.PureComponent{

  state = {
    isOpen: false,
  }

  copyToClipboard = () => {
    const copyText = document.getElementById("clipboard");
    copyText.select();
    document.execCommand("copy");
    this.setState({ isOpen: true });
  }

  onClose = () =>  this.setState({ isOpen: false });

  onOrderTrack = () => {
    this.props.history.push(`/track/id=${this.props.storeOrderInfo.id}${this.props.storeOrderInfo.pin ? `/pin=${this.props.storeOrderInfo.pin}` : ''}`)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={cx(classes.root, 'flexible grow jCenter vertical aCenter animated bounceInRight')}>
        <div className="image-block flexible jCenter aCenter">
          <img src="https://imsba.com/files/websites/83/311/logos/logo1.png" className={cx(classes.imageBlock, 'animated zoomIn')} alt="Serve"/>
        </div>
        <h4 className={cx(classes.onboardingTitle, 'animated zoomIn')}>Confirmation</h4>
        <div className={cx(classes.confirmationContent, 'lexible vertical jCenter')}>
          <div className="text-block flexible aCenter vertical">
            <h4 className={classes.h4}>Thank You</h4>
            <h4 className={classes.h4}>The order number is</h4>
            <h4 className={classes.h4}>{this.props.storeOrderInfo.order_id}</h4>
            <input className={classes.input} type="text" onChange={()=> {}} id="clipboard" value={this.props.storeOrderInfo.order_id}/>
            <strong className={classes.strong} onClick={()=> this.copyToClipboard()}>Click to Copy to clipboard</strong>
            <h5 className={classes.h5}>Please make sure to download the label.</h5>
          </div>
          <div className="flexible jAround wrap grow">
            <Button
              text="Download Label"
              onClick={this.props.onDownload}
            />
            <Button
              text="Place Another Order"
              onClick={this.props.onPlaceAnotherOrder}
            />
            <NavLink to={`/track/id=${this.props.storeOrderInfo.id}${this.props.storeOrderInfo.pin ? `/pin=${this.props.storeOrderInfo.pin}` : ''}`}>
              <Button
                text="Track Order"
              />
            </NavLink>

          </div>
        </div>
        {
          this.state.isOpen &&
          <Popup
            onPopupClose={this.onClose}
            message={`Copied to clipboard: ${this.props.storeOrderInfo.order_id}`}
          />
        }
      </div>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, null),
)(Confirmation);
