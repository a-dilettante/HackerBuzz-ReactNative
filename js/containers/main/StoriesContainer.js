import React, { Component } from 'react';
import StoryListContainer from '../list/StoryListContainer';
import FavoritesListContainer from '../favorites/FavoritesListContainer';

import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import { darkTheme } from '../../styles';

export default class StoriesContainer extends Component {
  static navigationOptions = () => ({
    title: 'Home'.toUpperCase(),
    headerTitleStyle: { color: darkTheme.headerTitle },
    headerStyle: {
      backgroundColor: darkTheme.headerBackground
    }
  });

  renderTabBar = () => {
    return (
      <DefaultTabBar
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: darkTheme.tabBarOutline
        }}
      />
    );
  };

  render() {
    return (
      <ScrollableTabView
        key={'main'}
        locked={true}
        style={{ backgroundColor: darkTheme.tabInactiveBackground }}
        tabBarActiveTextColor={darkTheme.tabBarUnderlineColor}
        tabBarUnderlineStyle={{
          backgroundColor: darkTheme.tabBarUnderlineColor
        }}
        tabBarBackgroundColor={darkTheme.tabInactiveBackground}
        tabBarInactiveTextColor={darkTheme.tabBarUnderlineColor}
        renderTabBar={this.renderTabBar}
      >
        <StoryListContainer
          route={'MainStory'}
          navigation={this.props.navigation}
          tabLabel={'NEW'}
          category={'newstories'}
        />
        <StoryListContainer
          route={'MainStory'}
          navigation={this.props.navigation}
          tabLabel={'TOP'}
          category={'topstories'}
        />
        <StoryListContainer
          route={'MainStory'}
          navigation={this.props.navigation}
          tabLabel={'BEST'}
          category={'beststories'}
        />
        <FavoritesListContainer
          route={'MainStory'}
          navigation={this.props.navigation}
          tabLabel={'FAVORITES'}
          category={'favorites'}
        />
      </ScrollableTabView>
    );
  }
}
