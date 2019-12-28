import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default class Activity extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>Activity Screen</Text>
                <Text>
                    itemId: {JSON.stringify(navigation.getParam('activityId', 'NO-ID'))}
                </Text>
            </View>
        );
    }
}