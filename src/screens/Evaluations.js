import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import Card from '../components/Card';

import styles from "./styles";
import forms from '../../assets/data/forms';

export default class Evaluations extends React.Component {
    renderEvaluations() {
        return forms.map((form) => {
            return (
                <Card key={form.id}>
                    <TouchableOpacity
                        style={{ width: '90%', }}
                        onPress={() => this.props.navigation.navigate('CreateEvaluation', {
                            formId: form.id,
                            form: JSON.stringify(form),
                        })}
                    >
                        <Text style={[t.textLg]}>{form.name}</Text>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Evaluations" />
                <View>
                    {this.renderEvaluations()}
                </View>
            </View>
        );
    }
}