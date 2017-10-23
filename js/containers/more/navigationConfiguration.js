import { StackNavigator } from 'react-navigation';
import MoreContainer from './MoreContainer';

const routeConfiguration = {
  MoreContainer: { screen: MoreContainer }
};

const stackNavigatorConfiguration = {
  initialRouteName: 'MoreContainer'
};

export const NavigatorTabMore = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);
