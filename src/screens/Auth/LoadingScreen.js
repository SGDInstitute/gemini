import React from 'react';
import { Notifications } from 'expo';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    // componentWillUnmount() {
    //     this._notificationSubscription && Notifications.removeListener(this._handleNotification);
    // }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('accessToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    _handleNotification = notification => {
        // do whatever you want to do with the notification
        if (notification.data.screen) {
            this.props.navigation.navigate(notification.data.screen);
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}