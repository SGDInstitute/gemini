import React from 'react';
import { Button, View, Text } from 'react-native';

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Home" />
                <View style={styles.container}>
                    <Text>Home Screen</Text>
                    <Button
                        title="Go to Schedule"
                        onPress={() => this.props.navigation.navigate('Schedule')}
                    />
                </View>
            </View>
        );
    }
}