import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from '../../screens/styles';

export default class ListField extends React.Component {
    handleValueChange = (value) => {
        this.props.onValueChange(this.props.field.id, value);
    }

    render() {
        const { field, input, onValueChange } = this.props;

        const choices = field.choices.map(choice => {
            return { label: choice, value: choice };
        });

        return (
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{field.question}</Text>
                <RNPickerSelect
                    onValueChange={this.handleValueChange}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: 10,
                            right: 12,
                        },
                    }}
                    items={choices}
                    Icon={() => {
                        return <MaterialCommunityIcons name="chevron-down" size={32} style={{ color: '#999', marginTop: -2 }} />;
                    }}
                />
                {field.description !== null && <Text style={styles.helpText}>{field.description}</Text>}
            </View>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});