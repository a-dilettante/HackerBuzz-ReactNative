import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { darkTheme } from '../../styles';

const styles = StyleSheet.create({
  shine: {
    width: 30,
    position: 'absolute',
    height: '100%',
    backgroundColor: darkTheme.storyPlaceholderBackground,
    opacity: 0.4
  }
});

const Shine = ({ children }) => {
  const animation = new Animated.Value(0);

  function start() {
    animation.setValue(0);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 100,
        duration: 1250
      })
    ]).start(() => {
      start();
    });
  }

  start();

  const left = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View>
      {children}
      <Animated.View style={[styles.shine, { left }]} />
    </View>
  );
};

Shine.propTypes = {
  children: PropTypes.shape({})
};

Shine.defaultProps = {
  children: null
};

export default Shine;
