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
import { connect } from 'react-redux';
import StoryListItem from './StoryListItem';
import { darkTheme } from '../../styles';
import NativeAdView from '../../components/NativeAdView';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

const placeholderArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
];

export class StoryList extends PureComponent {
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

  handleLeftActionComplete = item => {
    this.setState({ toggle: !this.state.toggle });
    this.props.handleLeftActionComplete(item);
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
    const { byId, stories, route } = this.props;

    const isFavorited = byId.filter(id => id === item.id).length > 0;
    const canSwipe = stories.length > 0;

    if (item.ad !== undefined) {
      return (
        <View style={{ flex: 1, width: '100%' }}>
          <NativeAdView />
        </View>
      );
    }

    var bgColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: isFavorited
        ? [darkTheme.savedStory, darkTheme.storyDivider]
        : [darkTheme.pullToSaveStory, darkTheme.savedStory]
    });
    return (
      <Swipeable
        leftActionActivationDistance={125}
        leftContent={
          canSwipe &&
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
                name={
                  leftActionActivated
                    ? isFavorited ? 'heart-o' : 'heart'
                    : isFavorited ? 'heart' : 'heart-o'
                }
                color={'white'}
              />
            </Animated.View>
        }
        onLeftActionActivate={this.handleLeftActionActivate}
        onLeftActionDeactivate={this.handleLeftActionDeactivate}
        onLeftActionComplete={_ => this.handleLeftActionComplete(item)}
        onSwipeStart={() => this.setState({ isSwiping: true })}
        onSwipeRelease={() => this.setState({ isSwiping: false })}
      >
        <StoryListItem
          id={item.id}
          story={item}
          navigation={this.props.navigation}
          handleTitlePress={this.handleTitlePress}
          route={route}
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
    this.props.handleLoadMore();
  };

  handleOnRefresh = () => {
    this.props.handleRefresh();
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
              : route === 'Favorites' ? [] : placeholderArray
          }
          renderItem={this._renderItem}
          initialNumToRender={20}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          onEndReached={this.handleOnEndReached}
          onEndReachedThreshold={1}
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

const mapStateToProps = state => {
  const { byId } = state.favorites;
  return { byId };
};

export default connect(mapStateToProps)(StoryList);
