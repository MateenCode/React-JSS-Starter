import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getColors } from 'helpers/getColors';

const mapStateToProps = ({websiteAssets}) => ({ colors: websiteAssets && websiteAssets.custom_colors });
class ServeProvider extends React.PureComponent {

  theme = {};

  generateTheme = (nextProps) => createMuiTheme({
      typography : {
          useNextVariants: true,
      },
      buttonColor:`#${getColors(nextProps.colors, 'titleColor')}`,
      buttonHoverColor: '#0362c6',
      white: `#${getColors(nextProps.colors, 'mainColor_1')}`,
      disabledColor: 'rgba(0, 0, 0, 0.12)',
      disabledTextColor: 'rgba(0, 0, 0, 0.26)',
      defaultPadding: '0.375rem 0.75rem',
      shadow: '0 25px 65px rgba(15, 24, 33, 0.29)',
      overlayColor: 'rgba(8,8,8,.63)',
      placeholderColor: '#a3a3a3',
      errorColor: 'rgb(185, 74, 72)',
      defaultColor: '#3E4B5B',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ecf5fe',
      linkHoverColor: '#0356ad',
      label: {
        marginBottom: 4,
        fontSize: '1rem',
      },
      errorText: {
        marginTop: 2,
        fontSize: '1rem',
      },
      textField: {
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      input: {
        display: 'block',
        width:'100%',
        padding: '0.375rem 0.75rem',
        fontSize: '0.9rem',
        lineHeight: 1.5,
        color: '#495057',
        backgroundColor: `#${getColors(nextProps.colors, 'mainColor_1')}`,
        backgroundClip: 'padding-box',
        border: '2px solid #dde2ec',
        borderRadius: 4,
        outline: 'none',
        boxSizing: 'border-box',
        '&:focus': {
          borderColor: `#${getColors(nextProps.colors, 'titleColor')}`,
        },
        '&::-webkit-input-placeholder': { /* Chrome/Opera/Safari */
          color: '#a3a3a3',
        },
        '&::-moz-placeholder': { /* Chrome/Opera/Safari */
          color: '#a3a3a3',
        },
        '&::-ms-input-placeholder': { /* Chrome/Opera/Safari */
          color: '#a3a3a3',
        },
        '&:-moz-placeholder': { /* Chrome/Opera/Safari */
          color: '#a3a3a3',
        },
      },
      noValid: {
        borderColor: 'rgb(185, 74, 72)',
        '&:focus': {
          borderColor: 'rgb(185, 74, 72)',
        }
      },
  });

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(this.props, nextProps)){
      this.theme = this.generateTheme(nextProps)
    }
  }

    render(){
      return <MuiThemeProvider theme={this.theme}>{this.props.children}</MuiThemeProvider>
    }
}

export default connect(mapStateToProps)(ServeProvider)
