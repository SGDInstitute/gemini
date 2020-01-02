import React from 'react';
import { Text, TextInput, View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import styles from '../../screens/styles';

export default class ListField extends React.Component {
    render() {
        const { field, input } = this.props;

        return (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{field.question}</Text>
                <TextInput
                    style={styles.input}
                    value={input}
                />
            </View>
        );
    }
}
