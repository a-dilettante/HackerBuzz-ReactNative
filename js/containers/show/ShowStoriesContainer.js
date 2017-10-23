import React, { Component } from 'react';
import StoryListContainer from '../list/StoryListContainer';
import { darkTheme } from '../../styles';

export default class ShowStoriesContainer extends Component {
  static navigationOptions = () => ({
    title: 'Show Stories'.toUpperCase(),
    headerTitleStyle: { color: darkTheme.headerTitle },
    headerStyle: {
      backgroundColor: darkTheme.headerBackground,
      borderBottomColor: darkTheme.tabBarOutline,
      borderBottomWidth: 0.5
    }
  });

  render() {
    return (
      <StoryListContainer
        route={'ShowStory'}
        navigation={this.props.navigation}
        category={'showstories'}
      />
    );
  }
}
