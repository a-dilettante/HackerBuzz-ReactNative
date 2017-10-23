import React, { Component } from 'react';
import StoryListContainer from '../list/StoryListContainer';
import { darkTheme } from '../../styles';

export default class JobStoriesContainer extends Component {
  static navigationOptions = () => ({
    title: 'Jobs'.toUpperCase(),
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
        route={'JobStory'}
        navigation={this.props.navigation}
        category={'jobstories'}
      />
    );
  }
}
