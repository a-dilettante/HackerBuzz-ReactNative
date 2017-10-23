const slidingTransition = (index, position, pageY) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 0]
  });

  const translateY = position.interpolate({
    inputRange,
    outputRange: [pageY, 0, 0]
  });

  return {
    opacity,
    transform: [{ translateY }]
  };
};

const transitionSpec = {
  duration: 500
};

export const transitionConfiguration = () => {
  return {
    transitionSpec: transitionSpec,
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const { index } = scene;
      const { params } = sceneProps.scene.route;
      const pageY = params ? params.pageY : 0;
      return slidingTransition(index, position, pageY);
    }
  };
};
