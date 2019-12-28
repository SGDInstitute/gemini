import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Evaluations extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Evaluations" />
                <View style={styles.container}>
                    <Text>Evaluations Screen</Text>
                </View>
            </View>
        );
    }
}