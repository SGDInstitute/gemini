import React from 'react';
import { View, Text } from 'react-native';

import styles from "./styles";

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