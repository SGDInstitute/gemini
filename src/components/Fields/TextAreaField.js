import React from 'react';
import { Text, TextInput, View } from 'react-native';

import styles from '../../screens/styles';

export default class TextAreaField extends React.Component {
    render() {
        const { field, input } = this.props;

        return (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{field.question}</Text>
                <TextInput
                    multiline
                    value={input}
                    style={styles.textarea}
                />
                {field.description !== null && <Text style={styles.helpText}>{field.description}</Text>}
            </View>
        );
    }
}
