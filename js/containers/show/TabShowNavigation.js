import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabShow } from './navigationConfiguration';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabShowNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Show',
    tabBarIcon: ({ tintColor }) => (
      <Icon size={20} name={'star'} color={tintColor} />
    )
  };

  render() {
    const { navigationState, dispatch } = this.props;
    return (
      <NavigatorTabShow
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
    navigationState: state.tabShow
  };
};

export default connect(mapStateToProps)(TabShowNavigation);
