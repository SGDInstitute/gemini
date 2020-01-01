import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default class BuildingCallout extends React.Component {
    render() {
        const { title, description } = this.props;
        return (
            <View style={styles.bubble}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        backgroundColor: '#009999',
        padding: 4,
        borderRadius: 4,
        width: 125
    },
    title: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 2,
    },
    description: {
        color: '#fefefe',
        fontSize: 12,
    },
});