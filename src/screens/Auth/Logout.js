import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';

export default class Logout extends React.Component {
    componentDidMount() {
        this.logout();
    }

    // Fetch the token from storage then navigate to our appropriate place
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
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