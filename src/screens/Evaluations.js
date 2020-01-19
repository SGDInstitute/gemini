import React from 'react';
import { AsyncStorage, Button, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import Card from '../components/Card';

import { getEvaluations } from '../utils/api';
import styles from "./styles";
import dayjs from 'dayjs';

export default class Evaluations extends React.Component {
    state = {
        evaluations: [],
    }

    componentDidMount = async () => {
        AsyncStorage.removeItem('evaluations');
        this.getEvaluations();
    }

    getEvaluations = async () => {
        const evaluations = await AsyncStorage.getItem('evaluations');

        if (evaluations && evaluations.length > 0) {
            this.setState({ evaluations: JSON.parse(evaluations) });
        } else {
            let evaluations = (await getEvaluations()).payload;
            this.setState({ evaluations: evaluations });
        }
    }

    handlePress = (evaluation) => {
        const start = dayjs(evaluation.start);
        const end = dayjs(evaluation.end);
        const now = dayjs();

        if (start.isAfter(now) && end.isAfter(now)) {
            return alert('This evaluation will open on ' + start.format('dddd MMMM D, h:mm A'));
        } else if (start.isBefore(now) && end.isAfter(now)) {
            this.props.navigation.navigate('CreateEvaluation', {
                formId: evaluation.id,
                form: JSON.stringify(evaluation),
            });
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return alert('This evaluation closed on ' + end.format('dddd MMMM D, h:mm A'));
        }
    }

    renderEvaluations() {
        const { evaluations } = this.state;

        return evaluations.map((form) => {
            return (
                <Card key={form.id}>
                    <TouchableOpacity
                        onPress={() => this.handlePress(form)}
                    >
                        <Text style={[t.textLg]}>{form.name}</Text>
                    </TouchableOpacity>
                    {this.renderTimes(form)}
                </Card>
            );
        });
    }

    renderTimes(evaluation) {
        const start = dayjs(evaluation.start);
        const end = dayjs(evaluation.end);
        const now = dayjs();
        if (start.isAfter(now) && end.isAfter(now)) {
            return <Text style={[t.textSm, t.italic, t.mT1, t.textGray700]}>Opens on: {start.format('ddd MMM D, h:mm A')}</Text>;
        } else if (start.isBefore(now) && end.isAfter(now)) {
            return <Text style={[t.textSm, t.italic, t.mT1, t.textGray700]}>Open until: {end.format('ddd MMM D, h:mm A')}</Text>;
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return <Text style={[t.textSm, t.italic, t.mT1, t.textGray700]}>Closed on {end.format('ddd MMM D, h:mm A')}</Text>;
        }
    }

    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Evaluations" />
                <ScrollView style={[t.pT4]}>
                    {this.renderEvaluations()}
                </ScrollView>
            </View>
        );
    }
}