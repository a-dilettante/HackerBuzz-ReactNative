import { StackNavigator } from 'react-navigation';
import JobStoriesContainer from './JobStoriesContainer';
import Story from '../story/Story';
import { transitionConfiguration } from '../../utils/animations/transitions';
import { darkTheme } from '../../styles';

const routeConfiguration = {
  JobStoriesContainer: { screen: JobStoriesContainer },
  JobStory: { screen: Story }
};

const stackNavigatorConfiguration = {
  initialRoute: 'JobStoriesContainer',
  navigationOptions: {
    headerBackTitle: null
  },
  gesturesEnabled: true,
  transitionConfig: transitionConfiguration,
  cardStyle: {
    backgroundColor: darkTheme.headerBackground
  }
};

export const NavigatorTabJobs = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);
