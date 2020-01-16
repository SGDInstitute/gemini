import React from 'react';
import { AsyncStorage, Button, TouchableOpacity, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import ScheduleList from '../components/ScheduleList';
import { storeUserActivities, getActivities, getUserActivities } from '../utils/api';
import { scheduleByDate } from '../utils/schedule';

export default class Schedule extends React.Component {
    state = {
        schedule: [],
        mySchedule: [],
        myScheduleFilter: false,
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getMySchedule().then(() => {
            this.getSchedule();
        });
    }

    onAdd = (id) => {
        storeUserActivities(id).then(() => {
            this.refreshMySchedule();
        });
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
            this.refreshSchedule()
        }
    }

    getMySchedule = async () => {
        const mySchedule = await AsyncStorage.getItem('my-schedule');

        if (mySchedule) {
            this.setState({ mySchedule: JSON.parse(mySchedule) });
        } else {
            this.refreshMySchedule();
        }
    }

    refreshSchedule = async () => {
        let schedule = (await getActivities()).payload;
        this.setState({ schedule: schedule });
    }

    refreshMySchedule = async () => {
        let mySchedule = (await getUserActivities()).payload;
        this.setState({ mySchedule: mySchedule });
    }

    renderLoading() {
        return (
            <View style={t.flex1}>
                <NavBar title="Schedule" />
                <View style={[t.flex1, t.itemsCenter, t.justifyCenter]}>
                    <Text>Loading...</Text>
                    <Button title="Refresh" onPress={this.refreshSchedule}></Button>
                </View>
            </View>
        );
    }

    renderContent() {
        const { schedule, mySchedule, myScheduleFilter, refreshing } = this.state;

        let filteredSchedule = schedule;

        if (myScheduleFilter) {
            const ids = mySchedule.map(activity => { return activity.id; });
            filteredSchedule = filteredSchedule.filter(activity => {
                return ids.includes(activity.id)
            });
        }

        const scheduleDates = scheduleByDate(filteredSchedule, myScheduleFilter);

        return (
            <View style={t.flex1}>
                <NavBar title="Schedule" />
                <ScheduleList
                    schedule={scheduleDates}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    onAdd={this.onAdd}
                />
                {myScheduleFilter ?
                    <TouchableOpacity style={[t.pB8, t.pT1, t.bgGray300]}>
                        <Button title="Entire Schedule" onPress={() => this.setState({ myScheduleFilter: !myScheduleFilter })} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[t.pB8, t.pT1, t.bgGray300]}>
                        <Button title="My Schedule" onPress={() => this.setState({ myScheduleFilter: !myScheduleFilter })} />
                    </TouchableOpacity>
                }
            </View>
        );
    }

    render() {
        const { schedule, mySchedule } = this.state;

        AsyncStorage.removeItem('schedule');
        AsyncStorage.removeItem('my-schedule');

        if (schedule.length === 0 && mySchedule.length === 0) { //make better
            return this.renderLoading();
        }

        return this.renderContent();
    }
}