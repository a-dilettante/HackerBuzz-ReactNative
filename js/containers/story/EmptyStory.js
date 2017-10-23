import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const EmptyStory = () => {
  const { container, icon, title, subtitle } = styles;
  return (
    <View style={container}>
      <Icon
        style={icon}
        size={125}
        name={'comments-o'}
        color={darkTheme.storyTimeAgo}
      />
      <Text style={title}>
        No Comments
      </Text>
      <Text style={subtitle}>
        Please check back later.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    fontSize: 20,
    fontWeight: '300',
    color: darkTheme.storyTimeAgo
  }
});
