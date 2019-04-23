import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import cx  from 'classnames';

import OrderTracking from './OrderTracking';
import OrderInfo from './OrderInfo';

import { orderTrack } from 'actions/dispatchTrack';

const styles = theme => ({
    root: {
      maxWidth: 550,
      width: '100%',
      margin: '0 auto',
      boxShadow: theme.shadow,
      backgroundColor: theme.white,
      borderRadius: 6,
      overflow: 'hidden',
    }
});

const mapStateToProps = ({orderedTrack}) => ({ orderedTrack });

class Track extends PureComponent {

    state = {
      ordered: false,
      isBusy: false,
      isOpen: false,
      error: null,
    }

    onTakenOrder = (order_id, order_pin) => {
      this.setState({ isBusy: true });
      const form = new FormData();
      form.append('order_id', order_id);
      form.append('order_pin', order_pin);

      this.props.orderTrack(form).then((data)=> {
        if(data && data.error){
          this.setState({ error: data.error, isOpen: true, isBusy: false });
        } else {
          this.setState({ data: data, isOpen: false, isBusy: false, ordered: true  }, ()=>{
            this.props.history.push(`/track/id=${order_id}${order_pin ? `/pin=${order_pin}`: ''}`)
          })
        }
      }).catch((data) => {
        this.setState({ error: data.error, isOpen: true, isBusy: false });
      });
    }

    onTogglePopup = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        return (
            <section
            className={cx(this.props.classes.root, 'animated bounceInUp')}
            >
              {
                this.state.ordered && this.props.orderedTrack ?
                  <OrderInfo
                    data={this.props.orderedTrack}
                  />:
                  <OrderTracking
                    params={this.props.match.params}
                    onTakenOrder={this.onTakenOrder}
                    isBusy={this.state.isBusy}
                    error={this.state.error}
                    isOpen={this.state.isOpen}
                    onTogglePopup={this.onTogglePopup}
                  />
              }
            </section>
        );
    }
}

export default compose(
  withRouter,
  connect(mapStateToProps, {orderTrack}),
  withStyles(styles)
)(Track)
