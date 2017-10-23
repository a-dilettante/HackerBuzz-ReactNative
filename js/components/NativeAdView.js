import React, { Component, PropTypes } from 'react';
import {
  requireNativeComponent,
  ViewPropTypes,
  DeviceEventEmitter
} from 'react-native';
const onAdLoaded = 'onAdLoaded';

class NativeAdView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener(onAdLoaded, this.onAdLoaded);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(onAdLoaded, this.onAdLoaded);
  }

  onAdLoaded = () => {
    this.setState({ height: 100 });
  };

  render() {
    const { height } = this.state;

    return (
      <RNTNativeAd
        {...this.props}
        style={{ height }}
        onAdLoaded={this.onAdLoaded}
      />
    );
  }
}

NativeAdView.propTypes = {
  ...ViewPropTypes,
  onAdLoaded: PropTypes.func
};

var RNTNativeAd = requireNativeComponent('RNTNativeAd', NativeAdView);

module.exports = NativeAdView;
