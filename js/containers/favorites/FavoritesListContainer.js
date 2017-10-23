import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import FavoritesStoryList from './FavoritesStoryList';
import { EmptyFavorites } from './EmptyFavorites';

import { favoriteStory, unfavoriteStory } from '../../actions/FavoriteActions';
import values from 'lodash/values';

export class FavoritesListContainer extends Component {
  handleLeftActionComplete = id => {
    this.props.unfavoriteStory(id);
  };

  render() {
    const { navigation, route, byHash } = this.props;

    if (Object.keys(byHash).length === 0 && byHash.constructor === Object) {
      return (
        <View style={{ flex: 1 }}>
          <EmptyFavorites
            style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
          />
        </View>
      );
    }

    return (
      <FavoritesStoryList
        stories={values(byHash)}
        refreshing={false}
        navigation={navigation}
        route={route}
        handleLeftActionComplete={this.handleLeftActionComplete}
      />
    );
  }
}

const mapStateToProps = state => {
  const { byHash } = state.favorites;
  return { byHash };
};

const mapDispatchToProps = dispatch => ({
  favoriteStory: story => dispatch(favoriteStory(story)),
  unfavoriteStory: id => dispatch(unfavoriteStory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FavoritesListContainer
);
