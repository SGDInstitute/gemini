import React from 'react';
import { View, Text } from 'react-native';

export default class Activity extends React.Component {
    render() {
        const activity = JSON.parse(this.props.navigation.getParam('activity', {}));

        return (
            <View>
                <Text>{activity.title}</Text>
                <Text>{activity.schedule}</Text>
                <Text>{activity.type}</Text>
                <Text>{activity.start}</Text>
                <Text>{activity.end}</Text>
                <Text>{activity.speaker}</Text>
            </View>
        );
    }
}