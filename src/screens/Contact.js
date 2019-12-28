import React from 'react';
import { View, Text } from 'react-native';

import styles from "./styles";

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Contact Screen</Text>
            </View>
        );
    }
}