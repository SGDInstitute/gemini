import React from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { ListField, TextField, TextAreaField } from '../Fields';

const components = {
    list: ListField,
    text: TextField,
    textarea: TextAreaField
}

const InputSelector = (props) => {
    const MatchingInput = components[props.field.type]
    return <MatchingInput field={props.field} input={props.input} onValueChange={props.onValueChange} />;
}

export default class Form extends React.Component {
    state = {
        values: {},
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.values);
    }

    onValueChange = (key, value) => {
        let { values } = this.state;
        values[key] = value;

        this.setState({ values });
    }

    render() {
        const { form, onSubmit } = this.props;

        return (
            <View>
                {form.map(field => {
                    return <InputSelector field={field} input={null} key={field.id} onValueChange={this.onValueChange}></InputSelector>;
                })}

                <TouchableOpacity>
                    <Button title="Save Responses" onPress={this.handleSubmit} />
                </TouchableOpacity>
            </View>
        );
    }
}