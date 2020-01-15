import React from 'react';
import { AsyncStorage, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ScheduleList from '../../components/ScheduleList';
import { scheduleByDate } from '../../utils/schedule';
import { getActivities } from "../../utils/api";

export default class EntireSchedule extends React.Component {
    state = {
        schedule: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getSchedule();
    }

    onRefresh = () => {
        this.setState({ refreshing: true });

        this.refreshSchedule().then(() => this.setState({ refreshing: false }));
    }

    getSchedule = async () => {
        const schedule = await AsyncStorage.getItem('schedule');

        if (schedule) {
            this.setState({ schedule: JSON.parse(schedule) });
        } else {
            let schedule = (await getActivities()).payload;
            this.setState({ schedule: schedule });
        }
    }

    refreshSchedule = async () => {
        let schedule = (await getActivities()).payload;
        this.setState({ schedule: schedule });
    }

    render() {
        const { schedule } = this.state;

        return (
            <View style={t.flex1}>
                <ScheduleList
                    schedule={scheduleByDate(schedule)}
                    navigation={this.props.navigation}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />
            </View>
        );
    }
}