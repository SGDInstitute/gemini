import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Contact Screen</Text>
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