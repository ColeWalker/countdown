import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const AppNavigator = createAppContainer(MainTabNavigator);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}