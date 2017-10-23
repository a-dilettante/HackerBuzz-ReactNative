import { StackNavigator } from 'react-navigation';
import ShowStoriesContainer from './ShowStoriesContainer';
import Story from '../story/Story';
import { transitionConfiguration } from '../../utils/animations/transitions';
import { darkTheme } from '../../styles';

const routeConfiguration = {
  ShowStoriesContainer: { screen: ShowStoriesContainer },
  ShowStory: { screen: Story }
};

const stackNavigatorConfiguration = {
  initialRouteName: 'ShowStoriesContainer',
  navigationOptions: {
    headerBackTitle: null
  },
  gesturesEnabled: true,
  transitionConfig: transitionConfiguration,
  cardStyle: {
    backgroundColor: darkTheme.headerBackground
  }
};

export const NavigatorTabShow = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);
