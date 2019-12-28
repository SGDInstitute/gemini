import React from 'react';
import { View, Text } from 'react-native';

import styles from "../styles";

export default class PersonalSchedule extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <View style={styles.container}>
                    <Text>Personal Schedule Screen</Text>
                </View>
            </View>
        );
    }
}