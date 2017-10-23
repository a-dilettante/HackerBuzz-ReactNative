import React, { PureComponent } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
  StatusBar,
  Animated,
  StyleSheet,
  Easing
} from 'react-native';
import StoryListItem from '../list/StoryListItem';
import { darkTheme } from '../../styles';
import NativeAdView from '../../components/NativeAdView';
import Swipeable from 'react-native-swipeable';
const placeholderArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FavoritesStoryList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      leftActionActivated: false,
      toggle: false
    };
    this.animatedValue = new Animated.Value(0);
  }

  handleTitlePress = (story, pageY) => {
    const { navigation, route } = this.props;
    navigation.navigate(route, { story, pageY });
  };

  _keyExtractor = item => (item.id ? item.id : item);

  handleLeftActionActivate = () => {
    this.setState({ leftActionActivated: true });
    this.animatePullToSave(1);
  };

  handleLeftActionDeactivate = () => {
    this.animatePullToSave(0);
    this.setState({ leftActionActivated: false });
  };

  handleLeftActionComplete = id => {
    this.setState({ toggle: !this.state.toggle });
    this.props.handleLeftActionComplete(id);
  };

  animatePullToSave = toValue => {
    Animated.timing(this.animatedValue, {
      toValue,
      duration: 750,
      easting: Easing.linear
    }).start();
  };

  _renderItem = ({ item }) => {
    const { leftActionActivated } = this.state;

    if (item.ad !== undefined) {
      return (
        <View style={{ flex: 1, width: '100%', height: 87 }}>
          <NativeAdView />
        </View>
      );
    }

    var bgColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [darkTheme.savedStory, darkTheme.storyDivider]
    });
    return (
      <Swipeable
        leftActionActivationDistance={125}
        leftContent={
          <Animated.View
            style={[
              styles.saveStoryContainer,
              {
                backgroundColor: bgColor
              }
            ]}
          >
            <Icon
              style={{ marginRight: 20 }}
              size={30}
              name={leftActionActivated ? 'heart-o' : 'heart'}
              color={'white'}
            />
          </Animated.View>
        }
        onLeftActionActivate={this.handleLeftActionActivate}
        onLeftActionDeactivate={this.handleLeftActionDeactivate}
        onLeftActionComplete={_ => this.handleLeftActionComplete(item.id)}
        onSwipeStart={() => this.setState({ isSwiping: true })}
        onSwipeRelease={() => this.setState({ isSwiping: false })}
      >
        <StoryListItem
          id={item.id}
          story={item}
          navigation={this.props.navigation}
          handleTitlePress={this.handleTitlePress}
        />
      </Swipeable>
    );
  };

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: darkTheme.storyDividingLine
        }}
      />
    );
  };

  _renderFooter = () => {
    if (!this.props.isLoading) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleOnEndReached = () => {
    // this.props.handleLoadMore();
  };

  handleOnRefresh = () => {
    // this.props.handleRefresh();
  };

  render() {
    const { stories, refreshing, route } = this.props;
    return (
      <View
        style={{ flex: 1, backgroundColor: darkTheme.tabInactiveBackground }}
      >
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ backgroundColor: darkTheme.tabInactiveBackground }}
          keyExtractor={this._keyExtractor}
          data={
            stories.length > 0
              ? stories
              : route === 'Favorites' ? stories : placeholderArray
          }
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          onEndReached={this.handleOnEndReached}
          onEndReachedThreshold={0.8}
          removeClippedSubviews={false}
          indicatorStyle={'white'}
          scrollEnabled={!this.state.isSwiping}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.handleOnRefresh}
              tintColor={darkTheme.copylink}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveStoryContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  saveStoryText: {
    fontWeight: '500',
    color: 'white',
    fontSize: 22,
    marginRight: 20
  }
});
