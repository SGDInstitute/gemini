import React from 'react';
import { Text, View, Alert } from 'react-native';
import { Notifications } from 'expo';

import Main from "./src/Main";

import registerForPushNotifications from './src/utils/notifications';

export default class App extends React.Component {
  state = {
    notification: {},
  }

  componentDidMount() {
    registerForPushNotifications();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    // do whatever you want to do with the notification
    this.setState({ notification: notification });

    console.log(notification);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Text>Origin: {this.state.notification.origin}</Text> */}
        {/* <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
        <Main />
      </View>
    );
  }
}