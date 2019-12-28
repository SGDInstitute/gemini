import React from 'react';
import { Button, View, Text } from 'react-native';

import styles from "./styles";

export default class Schedule extends React.Component {
    render() {
        return (
            <View style={styles.container}>
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