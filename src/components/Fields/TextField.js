import React from 'react';
import { Text, TextInput, View } from 'react-native';

import styles from '../../screens/styles';

export default class TextField extends React.Component {
    render() {
        const { field, input } = this.props;

        return (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{field.question}</Text>
                <TextInput
                    style={styles.input}
                    value={input}
                />
                {field.description !== null && <Text style={styles.helpText}>{field.description}</Text>}
            </View>
        );
    }
}
