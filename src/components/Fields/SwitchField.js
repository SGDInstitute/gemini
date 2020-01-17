import React from 'react';
import { Switch, TouchableOpacity, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

function ucfirst(str) {
    //Get the first character of the string.
    var firstChar = str.charAt(0);
    //Convert the first character to uppercase.
    firstChar = firstChar.toUpperCase();
    //Remove the original uncapitalized first character.
    var strWithoutFirstChar = str.slice(1);
    //Add the capitalized character to the start of the string.
    var newString = firstChar + strWithoutFirstChar;
    //Return it
    return newString;
}

export default class SwitchField extends React.Component {
    render() {
        const { field, value, onToggle, label } = this.props;
        const newLabel = label || ucfirst(field);

        return (
            <View style={[t.flexRow, t.w1_2, t.itemsCenter, t.mB2]}>
                <Switch style={[t.w16]} value={value} onValueChange={() => onToggle(field)} />
                <TouchableOpacity><Text onPress={() => onToggle(field)}>{newLabel}</Text></TouchableOpacity>
            </View>
        );
    }
}