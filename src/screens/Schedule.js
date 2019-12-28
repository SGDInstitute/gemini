import React from 'react';
import { Image, Button, View, Text, StyleSheet } from 'react-native';

export default class Schedule extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Schedule Screen</Text>
                <Button
                    title="Go to Keynote 1"
                    onPress={() => {
                        this.props.navigation.navigate('Activity', {
                            activityId: 1,
                        });
                    }}
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