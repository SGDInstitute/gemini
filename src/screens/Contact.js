import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Contact extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Contact" />
                <View style={styles.container}>
                    <Text>Contact Screen</Text>
                </View>
            </View>
        );
    }
}