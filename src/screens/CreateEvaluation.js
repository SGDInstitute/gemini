import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={[styles.flex1, styles.p4]}
                    scrollEnabled={true}
                >
                    <Form form={form.form} />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}