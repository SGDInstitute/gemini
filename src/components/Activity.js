import React from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

import styles from '../screens/styles'

export default class Activity extends React.Component {
    render() {
        const { title, type, location, start, end } = this.props;

        return (
            <View style={t.p4, t.textXl}>
                <Text>{title}</Text>
                <Text>
                    <Text>{start}</Text> - <Text>{end}</Text> | <Text>{location}</Text>
                </Text>
            </View>
        );
    }
}