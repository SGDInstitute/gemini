import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';

import BackNavBar from '../components/BackNavBar';
import Form from '../components/Evaluations/Form';
import styles from './styles';

export default class CreateEvaluation extends React.Component {
    handleSubmit = () => { }

    render() {
        const { navigation } = this.props;

        const form = JSON.parse(navigation.getParam('form', {}));

        return (
            <View style={styles.flex1}>
                <BackNavBar title={form.name} back="Evaluations" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[styles.flex1, styles.pT8]}
                >
                    <ScrollView>
                        <Form form={form.form} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}