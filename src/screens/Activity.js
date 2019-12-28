import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Activity extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.flex1}>
                <NavBar title="Activity" />
                <View style={styles.container}>
                    <Text>Activity Screen</Text>
                    <Text>
                        itemId: {JSON.stringify(navigation.getParam('activityId', 'NO-ID'))}
                    </Text>
                </View>
            </View>
        );
    }
}