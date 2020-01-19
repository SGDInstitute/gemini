import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';

import BackNavBar from '../components/BackNavBar';
import Form from '../components/Evaluations/Form';
import styles from './styles';
import { storeEvaluationResponse } from '../utils/api';

export default class CreateEvaluation extends React.Component {
    constructor(props) {
        super(props);

        const { navigation } = props;

        const form = JSON.parse(navigation.getParam('form', {}));

        this.state = {
            form: form,
        }
    }

    onSubmit = async (data) => {
        const { form } = this.state;
        let response = (await storeEvaluationResponse(form, data)).payload;

        console.log(response);
    }

    render() {
        const { form } = this.state;

        return (
            <View style={styles.flex1}>
                <BackNavBar title={form.name} back="Evaluations" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[styles.flex1, styles.pT8]}
                >
                    <ScrollView>
                        <Form form={form.form} onSubmit={this.onSubmit} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}