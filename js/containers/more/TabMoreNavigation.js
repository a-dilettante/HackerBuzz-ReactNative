import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabMore } from './navigationConfiguration';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabMoreNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({ tintColor }) => (
      <Icon size={20} name={'ellipsis-h'} color={tintColor} />
    )
  };

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigatorTabMore
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navigationState
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.tabMore
  };
};

export default connect(mapStateToProps)(TabMoreNavigation);
