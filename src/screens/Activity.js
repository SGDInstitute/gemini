import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default class Activity extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Activity Screen</Text>
                <Text>
                    itemId: {JSON.stringify(navigation.getParam('activityId', 'NO-ID'))}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});