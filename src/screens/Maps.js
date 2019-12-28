import React from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';

export default class Maps extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Maps Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});