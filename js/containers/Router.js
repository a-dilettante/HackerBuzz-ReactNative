import React, { Component } from 'react';
import { View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { TabBar } from './navigationConfiguration';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownManager } from '../utils/DropDownManager';

class Router extends Component {
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TabBar
          navigation={addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })}
        />
        <DropdownAlert
          ref={ref => DropDownManager.setDropDown(ref)}
          updateStatusBar={false}
          imageStyle={{ height: 0, width: 0 }}
          closeInterval={2000}
          successColor={'#61afef'}
          containerStyle={{
            height: 64,
            backgroundColor: '#61afef',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          titleStyle={{
            fontSize: 14,
            textAlign: 'center',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'transparent'
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigationState: state.tabBar,
    storiesState: state.storyList
  };
};

export default connect(mapStateToProps)(Router);
