import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const EmptyFavorites = () => {
  const { container, icon, title, subtitle } = styles;
  return (
    <View style={container}>
      <Icon
        style={icon}
        size={125}
        name={'heart-o'}
        color={darkTheme.storyTimeAgo}
      />
      <Text style={title}>
        No Favorites
      </Text>
      <Text style={subtitle}>
        If you like a story, it will show up here!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.storyBackground,
    margin: 15
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: '400',
    color: darkTheme.storyTimeAgo
  },
  subtitle: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '300',
    color: darkTheme.storyTimeAgo
  }
});
