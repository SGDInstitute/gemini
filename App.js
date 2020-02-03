import React from 'react';
import { Notifications } from 'expo';
import { enableScreens } from 'react-native-screens';

import Main from "./src/Main";
enableScreens();

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}