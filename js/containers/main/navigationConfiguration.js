import { StackNavigator } from 'react-navigation';
import StoriesContainer from './StoriesContainer';
import Story from '../story/Story';
import { transitionConfiguration } from '../../utils/animations/transitions';
import { darkTheme } from '../../styles';

const routeConfiguration = {
  StoriesContainer: { screen: StoriesContainer },
  MainStory: { screen: Story }
};

const stackNavigatorConfiguration = {
  initialRouteName: 'StoriesContainer',
  key: 'main',
  navigationOptions: {
    headerBackTitle: null
  },
  gesturesEnabled: true,
  transitionConfig: transitionConfiguration,
  cardStyle: {
    backgroundColor: darkTheme.headerBackground
  }
};

export const NavigatorTabMain = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);
