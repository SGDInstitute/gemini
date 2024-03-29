import React from 'react';
import { AsyncStorage, RefreshControl, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ListItem } from 'react-native-elements'

import NavBar from '../components/NavBar';

import { getEvaluations } from '../utils/api';
import styles from "./styles";
import dayjs from 'dayjs';

export default class Evaluations extends React.Component {
    state = {
        evaluations: [],
        responses: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        await this.getEvaluations().then(() => {
            this.getResponses();
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });

        this.refreshEvaluations().then(() => this.setState({ refreshing: false }));
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

    getResponses = async () => {
        const { evaluations } = this.state;

        const responsesIds = evaluations.map((evaluation) => {
            return 'responses' + evaluation.id;
        })

        await AsyncStorage.multiGet(responsesIds, (err, stores) => {
            stores = stores.map((result, i, store) => {
                return {
                    id: parseInt(store[i][0].replace('responses', '')),
                    key: store[i][0],
                    value: store[i][1],
                }
            });

            this.setState({ responses: stores });
        });
    }

    refreshEvaluations = async () => {
        let evaluations = (await getEvaluations()).payload;
        this.setState({ evaluations: evaluations });

        this.getResponses();
    }

    handlePress = (evaluation) => {
        const response = this.state.responses.find(x => x.id === evaluation.id);
        const start = dayjs(evaluation.start);
        const end = dayjs(evaluation.end);
        const now = dayjs();

        if (start.isAfter(now) && end.isAfter(now)) {
            return alert('This evaluation will open on ' + start.format('dddd MMMM D, h:mm A'));
        } else if (start.isBefore(now) && end.isAfter(now)) {
            if (typeof response === 'undefined' || response.value === null) {
                this.props.navigation.navigate('CreateEvaluation', {
                    formId: evaluation.id,
                    form: JSON.stringify(evaluation),
                });
            } else {
                return alert('Thank you for submitting this evaluation!');
            }
        } else if (start.isBefore(now) && end.isBefore(now)) {
            if (typeof response === 'undefined' || response.value === null) {
                return alert('This evaluation closed on ' + end.format('dddd MMMM D, h:mm A'));
            } else {
                return alert('Thank you for submitting this evaluation!');
            }
        }
    }

    renderEvaluations() {
        const { evaluations } = this.state;

        return evaluations.map((form) => {
            return (
                <ListItem key={form.id}
                    title={form.name}
                    subtitle={this.renderTimes(form)}
                    onPress={() => this.handlePress(form)}
                    rightIcon={this.renderButton(form)}
                    bottomDivider
                />
            );
        });
    }

    renderButton(evaluation) {
        const { responses } = this.state;
        const response = responses.find(x => x.id === evaluation.id);
        const start = dayjs(evaluation.start);
        const end = dayjs(evaluation.end);
        const now = dayjs();
        let complete = null;
        if (typeof response === 'undefined' || response.value === null) {
            complete === null;
        } else {
            complete = <TouchableOpacity onPress={() => this.handlePress(evaluation)}><MaterialCommunityIcons name="check-decagram" style={[t.textGreen500]} size={28} /></TouchableOpacity>;
        }

        if (start.isAfter(now) && end.isAfter(now)) {
            return complete || <TouchableOpacity onPress={() => this.handlePress(evaluation)}><MaterialCommunityIcons name="cancel" size={28} /></TouchableOpacity>;
        } else if (start.isBefore(now) && end.isAfter(now)) {
            return complete || <TouchableOpacity onPress={() => this.handlePress(evaluation)}><MaterialCommunityIcons style={[t.textGray400]} name="chevron-right" size={28} /></TouchableOpacity>;
        } else if (start.isBefore(now) && end.isBefore(now)) {
            return complete || <TouchableOpacity onPress={() => this.handlePress(evaluation)}><MaterialCommunityIcons name="cancel" size={28} /></TouchableOpacity>;
        }
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
        const { refreshing } = this.state;

        return (
            <View style={styles.flex1}>
                <NavigationEvents
                    onWillFocus={payload => this.onRefresh()}
                />
                <NavBar title="Evaluations" />
                <ScrollView
                    contentContainerStyle={[styles.pB8]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
                    }>
                    {this.renderEvaluations()}
                </ScrollView>
            </View>
        );
    }
}