import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';

import { USER_PUSH_URL } from '../../config/endpoints'

export default async function registerForPushNotifications(accessToken = null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // Get the user's access token, so they can connect with the API
    if (accessToken === null) {
        accessToken = await AsyncStorage.getItem('accessToken');
    }

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(USER_PUSH_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            token: token,
        }),
    });
}