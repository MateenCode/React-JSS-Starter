import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

import statusDetector from './statusDetector';
import { getColors } from 'helpers/getColors';

const styles = theme => ({
    mapContent: {
      flexBasis: 550,
      height: 350,
      position: 'relative'
    },
    infoContent: {
      padding: '40px 50px'
    },
    providerImageBlock: {
      minWidth: 100,
      width: 100,
      height: 100,
      backgroundSize: 'cover',
      marginRight: 20,
    },
    filesImageBlock: {
      minWidth: 130,
      width: 130,
      height: 130,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      marginRight: 20,
    },
    filesContentFirstElement: {
      marginBottom: 10
    }
});

const mapStateToProps = ({websiteAssets}) => ({ websiteAssets });

class OrderInfo extends React.PureComponent{

  generateFiles = () => (
    this.props.data.files.map(item => (
      <div className={cx(this.props.classes.filesContentFirstElement, "flexible")} key={item.id}>
        <div className={this.props.classes.filesImageBlock} style={{ backgroundImage: `url(https://imsba.com/${item.url})` }}/>
        <span>Success</span>
      </div>
    ))
  );

  generateProvider = () => (
    <div className="devlivery-provider-body flexible">
      <div className={this.props.classes.providerImageBlock} style={{ backgroundImage: `url(https://imsba.com/${this.props.data.provider ? this.props.data.provider.profile_picture : ''})` }}/>
      <div className="flexible vertical">
        <span className="text-label">Name:</span>
        <span className="text">{this.props.data.provider ? this.props.data.provider.first_name : ''} {this.props.data.provider ? this.props.data.provider.last_name : ''}</span>
      </div>
    </div>
  );

  generateHistory = () => (
    this.props.data.logs.map(item => (
      <div className="flexible fBasis" key={item.id}>
        <span className="flexible fBasis50">{item.action}</span>
        <span className="flexible fBasis50">{item.datetime}</span>
      </div>
    ))
  );

  generateMap = () => (
    <Map
      google={this.props.google}
      style={{
        width: '100%',
        height: '100%',
      }}
      initialCenter={{
        lat: this.props.data.service_lat,
        lng: this.props.data.service_lng
      }}
      onDragend={this.centerMoved}
      zoom={12}
    >
      <Marker
        position={{ lat: this.props.data.provider && this.props.data.provider.lat, lng: this.props.data.provider && this.props.data.provider.lng }}
        icon={{
            url: "https://www.freeiconspng.com/uploads/red-sports-car-png-1.png",
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(59,40)
          }}
      />
      <Marker position={{ lat: this.props.data.service_lat, lng: this.props.data.service_lng }} />
    </Map>
  )

  generateOrderInformation = () => (
    <div className="order-information-content">
      <h4 className="info-title" style={{ color: `#${getColors(this.props.colors, 'mainColor_10')}` }}>
        Order Information
      </h4>
      <div className="flexible fBasis ">
        <div className="flexible fBasis50 vertical">
          <span className="text-label">Status:</span>
          <span className="text">{statusDetector(this.props.data.status)}</span>
        </div>
        <div className="flexible fBasis50 vertical">
          <span className="text-label">Window:</span>
          <span className="text">Mar 18 2019  5pm to 9pm</span>
        </div>
      </div>
      <hr/>
      <div className="flexible fBasis ">
        <div className="flexible fBasis50 vertical">
          <span className="text-label">Pickup:</span>
          <span className="text"></span>
        </div>
        <div className="flexible fBasis50 vertical">
          <span className="text-label">Droppoff:</span>
          <span className="text">{this.props.data.service_location}</span>
        </div>
      </div>
    </div>
  )

  render(){
    return(
      <div className="OrderInfo">
        <div className={this.props.classes.mapContent}>
          {this.generateMap()}
        </div>
        <div className={this.props.classes.infoContent}>
          {this.generateOrderInformation()}
          <hr/>
          <div className="devlivery-provider-content">
            <h4 className="info-title">
              Delivery Provider
            </h4>
            {this.generateProvider()}
          </div>
          <hr/>
          <div className="history-content">
            <h4 className="info-title">
              History
            </h4>
            {this.generateHistory()}
          </div>
          <hr/>
          <div className="files-content">
            <h4 className="info-title">
              Files
            </h4>
            {this.generateFiles()}
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(mapStateToProps, null),
  GoogleApiWrapper((props)=>({ apiKey: (props.websiteAssets.google_api_key) })),
  withStyles(styles)
)(OrderInfo)
