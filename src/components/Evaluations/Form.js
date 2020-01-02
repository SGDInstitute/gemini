import React from 'react';
import { View, Text } from 'react-native';
import { ListField, TextField, TextAreaField } from '../Fields';

const components = {
    list: ListField,
    text: TextField,
    textarea: TextAreaField
}

const InputSelector = (props) => {
    const MatchingInput = components[props.field.type]
    return <MatchingInput field={props.field} input={props.input} />;
}

export default class Form extends React.Component {
    render() {
        const { form } = this.props;

        return (
            <View>
                {form.map(field => {
                    return <InputSelector field={field} input={null} key={field.id}></InputSelector>;
                })}
            </View>
        );
    }
}