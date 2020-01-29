import React from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';

import BackNavBar from '../components/BackNavBar';
import Form from '../components/Evaluations/Form';
import styles from './styles';
import { storeEvaluationResponse, storeTicket } from '../utils/api';

export default class CreateEvaluation extends React.Component {
    constructor(props) {
        super(props);

        const { navigation } = props;

        const form = JSON.parse(navigation.getParam('form', {}));

        this.state = {
            form: form,
            errors: [],
        }
    }

    onSubmit = async (data) => {
        const { form } = this.state;
        let response = await storeEvaluationResponse(form, data);

        if (response.type === 'success') {
            let message = 'Your response has been saved.';

            if (data.concern !== null) {
                let result = await storeTicket({ subject: form.name + ' Concern', message: data.concern });
                message = 'Your response has been saved and an email has been sent to us with your concern.';
            }

            Alert.alert(
                'Success!',
                message,
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Evaluations') },
                ],
                { cancelable: false }
            );
        } else {
            this.setState({ errors: response.errors })
            alert(response.payload);
        }
    }

    renderErrors() {
        const { errors } = this.state;

        return (
            <View style={[t.bgRed100, t.border, t.borderRed400, t.rounded, t.p4, t.mX4, t.mB8]}>
                {
                    errors.map((error) => (
                        <Text key={error} >{error}</Text>
                    ))
                }
            </View>
        );
    }

    render() {
        const { form, errors } = this.state;

        return (
            <View style={styles.flex1}>
                <BackNavBar title={form.name} back="Evaluations" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[styles.flex1, styles.pT8]}
                >
                    <ScrollView>
                        {errors.length > 0 && this.renderErrors()}
                        <Form form={form.form} onSubmit={this.onSubmit} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}