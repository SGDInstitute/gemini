import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Maps extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Maps" />
                <View style={styles.container}>
                    <Text>Maps Screen</Text>
                </View>
            </View>
        );
    }
}