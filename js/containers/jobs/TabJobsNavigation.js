import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabJobs } from './navigationConfiguration';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class TabJobsNavigation extends Component {
  static navigationOptions = {
    tabBarLabel: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
      <Icon size={20} name={'rocket'} color={tintColor} />
    )
  };

  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <NavigatorTabJobs
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
    navigationState: state.tabJobs
  };
};

export default connect(mapStateToProps)(TabJobsNavigation);
