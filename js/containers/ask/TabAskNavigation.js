import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabAsk } from './navigationConfiguration';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabAskNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Ask',
    tabBarIcon: ({ tintColor }) => (
      <Icon size={20} name={'question'} color={tintColor} />
    )
  };

  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <NavigatorTabAsk
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
    navigationState: state.tabAsk
  };
};

export default connect(mapStateToProps)(TabAskNavigation);
