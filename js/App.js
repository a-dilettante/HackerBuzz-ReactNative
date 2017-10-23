import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import Router from './containers/Router';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }

  render() {
    const { store, isLoading } = this.state;
    if (isLoading) {
      return null;
    }

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('HackerBuzz', () => App);
