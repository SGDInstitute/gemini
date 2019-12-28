import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Schedule"
                    onPress={() => this.props.navigation.navigate('Schedule')}
                />
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