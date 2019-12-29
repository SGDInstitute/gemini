import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../../components/NavBar';

export default class Activity extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Activity" />
                <View style={styles.container}>
                    <Text>Activity Screen</Text>
                </View>
            </View>
        );
    }
}