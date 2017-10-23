import React, { Component } from 'react';
import StoryListContainer from '../list/StoryListContainer';
import { darkTheme } from '../../styles';

export default class AskStoriesContainer extends Component {
  static navigationOptions = () => ({
    title: 'Ask Stories'.toUpperCase(),
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
        route={'AskStory'}
        navigation={this.props.navigation}
        category={'askstories'}
      />
    );
  }
}
