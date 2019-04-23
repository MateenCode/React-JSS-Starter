import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { GoogleApiWrapper } from 'google-maps-react';
import cx  from 'classnames';

import formData from './formData';

import { PUBLIC_API_KEY } from 'configs/types';
import { BASE_URL } from 'configs';

import { TextField, TextArea, Button, Loading, Popup, Checkbox, NumericTextField } from 'components';
import  Confirmation  from './Confirmation';

import { storeOrder } from 'actions/storeOrder';

import downloader from 'helpers/downloader';

const styles = theme => ({
    root: {
      minHeight: '100%',
      height: '100%',
    },
    orderContent: {
      padding: 40,
      boxShadow: theme.shadow,
      backgroundColor: theme.white,
      maxWidth: '80%',
      borderRadius: 6,
      margin: '0 auto',
    },
    loading: {
      marginTop: 20
    },
    resizible: {
      flexGrow: 1,
      margin: '0 10px',
    },
    '@media (max-width: 520px)' : {
      root : {
        display: 'block',
        overflow: 'auto'
      }
    }
});

const mapStateToProps = ({ storeOrderInfo, websiteAssets }) => ({ storeOrderInfo, websiteAssets });

class Order extends React.PureComponent{

  state = {
    formData: {
      shipping_first_name: '',
      shipping_last_name: '',
      email_address: '',
      phone_number: '',
      pickup_location: '',
      service_location: '',
      pickup_person: '',
      pickup_time: '',
      package: '',
      dropoff_person: '',
      pickup_lat: '',
      pickup_lng: '',
      service_lat: '',
      service_lng: '',
      pin: Math.floor((Math.random() * 10000))
    },
    isBusy: false,
    isOpen: false,
    isOrdered: false,
    valid: false,
    error: null,
  };

  componentDidUpdate(){
    const filled = [
      this.state.formData.shipping_first_name,
      this.state.formData.shipping_last_name,
      this.state.formData.email_address,
      this.state.formData.phone_number,
      this.state.formData.pickup_location,
      this.state.formData.service_location,
      this.state.formData.pickup_person,
      this.state.formData.pickup_time,
      this.state.formData.package,
      this.state.formData.dropoff_person,
    ].every(element => element.length > 0);

    this.setState({ valid: filled });

  }

  onChange = (event, name) => this.setState({ formData: { ...this.state.formData, [name]: event.target.value } });

  onChangeNumericField = (value, name) => this.setState({ formData: { ...this.state.formData, [name]: value || '' } });

  onChecked = (event, name) => this.setState({ formData: { ...this.state.formData, [name]: event.target.checked ? 1 : 0 } });

  onTogglePopup = () => this.setState({ isOpen: !this.state.isOpen });

  onPlaceAnotherOrder = () => this.setState({ isOrdered : false, formData, error: null, isOpen: false, service_location: false, pickup_location: false });

  onDownload = () => {
    const id  = this.props.storeOrderInfo.id;
    downloader(`${BASE_URL}api/v2/file/label?key=${PUBLIC_API_KEY}&id=${id}`, `label_${id}`)
  };

  generateRandomCode = () => {
    const time = new Date();
    const randomCount = Math.floor((Math.random() * 10000)).toString();
    const orderId = time.getTime().toString().split('').splice(0,10).join("");

    return Number(orderId.concat(randomCount))
  }

  readyToSubmit = () => {
    const data = {...this.state.formData};
    data.barcode = data.cartsession = this.generateRandomCode();

    const form = new FormData();

    for(let name in data) {
        form.append(name, data[name]);
    };
    this.props.storeOrder(form).then((res) => {
      res && this.setState({ isOrdered: true, isBusy: false })
    });
  }

  onSubmit = () => {

    this.setState({ isBusy: true });

    const promisePickupLocation = new Promise((resolve, reject) => {
      this.props.google.maps.Geocoder.prototype.geocode({ address: this.state.formData.pickup_location }, (results, status) =>{
        if(status === this.props.google.maps.GeocoderStatus.OK) {
          resolve({
            pickup_lat: results[0].geometry.location.lat(),
            pickup_lng: results[0].geometry.location.lng(),
          })
        } else {
            reject(true); // reject
        }
      });
    });

    const promiseServiceLocation = new Promise((resolve, reject) => {
      this.props.google.maps.Geocoder.prototype.geocode({ address: this.state.formData.service_location }, (results, status) =>{
        if(status === this.props.google.maps.GeocoderStatus.OK) {
          resolve({
            service_lat: results[0].geometry.location.lat(),
            service_lng: results[0].geometry.location.lng(),
          })
        } else {
            reject(true); // reject
        }

      });
    });


    promiseServiceLocation.then((res) => res)
    .then((data) => {
      this.setState({
        service_location: true,
        formData: {
          ...this.state.formData,
          service_lat: data.service_lat,
          service_lng: data.service_lng,
        },
        isOpen: !this.state.pickup_location,
      }, () => {
        if(this.state.service_location && this.state.pickup_location) {
          this.readyToSubmit();
        }
      })
    })
    .catch((err) => {
      if(err) {
        this.setState({
          isOpen: true,
          error: `Please fill correct   ""Drop Off Address""`,
          isBusy: false
        })
      }
    });

    promisePickupLocation.then((res) => res)
    .then((data) => {
      this.setState({
        pickup_location: true,
        formData: {
          ...this.state.formData,
          pickup_lat: data.pickup_lat,
          pickup_lng: data.pickup_lng,
        },
        isOpen: !this.state.service_location,
      }, () => {
        if(this.state.service_location && this.state.pickup_location) {
          this.readyToSubmit();
        }
      })
    })
    .catch((err) => {
      if(err) {
        this.setState({
          isOpen: true,
          error: `Please fill correct   ""Pick UP Address""`,
          isBusy: false,
        })
      }
    });


  }

  render(){
    const { classes } = this.props;
    return (
      <div className={cx(classes.root, 'flexible aCenter jCenter')}>
        { this.state.isOrdered ?
          <Confirmation
            onPlaceAnotherOrder={this.onPlaceAnotherOrder}
            onDownload={this.onDownload}
          /> :
          <div className={cx(classes.orderContent,'flexible grow vertical animated bounceInLeft')}>
            <div className="flexible grow jAround wrap">
            <TextField
              label="First Name"
              placeholder="First Name"
              type="text"
              onChange={(e)=> this.onChange(e, 'shipping_first_name')}
              value={this.state.formData.shipping_first_name || ''}
              required
              className={classes.resizible}
            />
            <TextField
              label="Last Name"
              placeholder="Last Name"
              type="text"
              onChange={(e)=> this.onChange(e, 'shipping_last_name')}
              value={this.state.formData.shipping_last_name || ''}
              required
              className={classes.resizible}
            />
            <TextField
              label="Email Address"
              placeholder="Email Address"
              type="text"
              email
              onChange={(e)=> this.onChange(e, 'email_address')}
              value={this.state.formData.email_address || ''}
              required
              className={classes.resizible}
            />
            <NumericTextField
              label="Phone Number"
              placeholder="(###) ###-####"
              type="text"
              onChange={(v)=> this.onChangeNumericField(v, 'phone_number')}
              value={this.state.formData.phone_number || ''}
              required
              className={classes.resizible}
            />
            </div>
            <div className="flexible grow jAround wrap">
              <TextField
                label="Pick Up Address"
                placeholder="Pick Up Address"
                type="text"
                onChange={(e)=> this.onChange(e, 'pickup_location')}
                value={this.state.formData.pickup_location || ''}
                required
                className={classes.resizible}
              />
              <TextField
                label="Drop Off Address"
                placeholder="Drop Off Address"
                type="text"
                onChange={(e)=> this.onChange(e, 'service_location')}
                value={this.state.formData.service_location || ''}
                required
                className={classes.resizible}
              />
            </div>
            <div className="flexible grow jAround wrap">
              <TextField
                label="Alternate Pick Up Contact Person"
                placeholder="Alternate Contact Person"
                type="text"
                onChange={(e)=> this.onChange(e, 'pickup_person')}
                value={this.state.formData.pickup_person || ''}
                required
                className={classes.resizible}
              />
              <TextField
                label="Pickup Time"
                placeholder="Ex. 9am"
                type="text"
                onChange={(e)=> this.onChange(e, 'pickup_time')}
                value={this.state.formData.pickup_time || ''}
                required
                className={classes.resizible}
              />
              <TextField
                label="Packages"
                placeholder="Ex. 2"
                type="number"
                onChange={(e)=> this.onChange(e, 'package')}
                value={this.state.formData.package || ''}
                required
                className={classes.resizible}
              />
              <TextField
                label="Alternate Drop Off Contact Person"
                placeholder="Alternate Contact Person"
                type="text"
                onChange={(e)=> this.onChange(e, 'dropoff_person')}
                value={this.state.formData.dropoff_person || ''}
                required
                className={classes.resizible}
              />
            </div>
            <div className="flexible grow">
              <TextArea
                label="Special Instructions"
                placeholder="Special Instructions"
                onChange={(e) => this.onChange(e, 'delivery_notes')}
                value={this.state.formData.delivery_notes || ''}
                className={classes.resizible}
              />
            </div>
            <div className="flexible grow jAround wrap">
              <Checkbox
                label="Unattended"
                id="Unattended"
                onChange={(e) => this.onChecked(e, 'leave')}
                value={this.state.formData.leave || ''}
              />
              <Checkbox
                label="Residence"
                id="Residence"
                onChange={(e) => this.onChecked(e, 'residence')}
                value={this.state.formData.residence || ''}
              />
              <Checkbox
                label="Business"
                id="Business"
                onChange={(e) => this.onChecked(e, 'business')}
                value={this.state.formData.business || ''}
              />
              <Checkbox
                label="Signature"
                id="Signature"
                onChange={(e) => this.onChecked(e, 'signature')}
                value={this.state.formData.signature || ''}
              />
            </div>
            <Button
              text="Submit"
              onClick={()=> this.onSubmit()}
              disabled={!this.state.valid}
            />
            { this.state.isBusy && <Loading className={classes.loading}/> }
            {
              this.state.isOpen &&
              <Popup
                onPopupClose={this.onTogglePopup}
                message={this.state.error}
              />
            }
          </div>
        }
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { storeOrder }),
  GoogleApiWrapper({ apiKey: 'AIzaSyCWVQYXw3-0uPgC7OKp87AxvolgGSMgzb8'})
)(Order);
