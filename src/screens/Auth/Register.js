import React from 'react';
import { View, Text } from 'react-native';

import NavBar from '../../components/NavBar';
import styles from "../styles";

export default class Register extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Register" />
                <View style={styles.container}>
                    <Text>Create an Account</Text>
                </View>
            </View>
        );
    }
}