import React from 'react';
import { AsyncStorage, Button, TouchableOpacity, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import ScheduleList from '../components/ScheduleList';
import { storeUserActivities, getActivities, getUserActivities } from '../utils/api';
import { scheduleByDate } from '../utils/schedule';
import Filters from '../components/Activity/Filters';

export default class Schedule extends React.Component {
    state = {
        filters: {
            workshop: true,
            keynote: true,
            entertainment: true,
            featured: true,
            advisor: true,
            general: true,
            milner: true,
            sangren: true,
            bernhard: true,
        },
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

    checkIfInPersonalSchedule = (id) => {
        const { mySchedule } = this.state;

        if (mySchedule) {
            const found = mySchedule.find(x => x.id === id);
            if (typeof found !== 'undefined') {
                return true;
            }
        } else {
            return false;
        }
    }

    handleScheduleToggle = () => {
        const { myScheduleFilter } = this.state;
        this.setState({ myScheduleFilter: !myScheduleFilter });
    }

    onAdd = (id) => {
        storeUserActivities(id).then(() => {
            this.refreshMySchedule();
        });
    }

    onFiltersClose = (filters) => {
        this.setState({ filters: filters });
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
        const { schedule, mySchedule, myScheduleFilter, refreshing, filters } = this.state;

        let navLabel = 'Schedule';

        let filteredSchedule = JSON.parse(JSON.stringify(schedule));

        if (myScheduleFilter) {
            navLabel = 'My Schedule';
            const ids = mySchedule.map(activity => { return activity.id; });
            filteredSchedule = filteredSchedule.filter(activity => {
                return ids.includes(activity.id);
            });
        }

        if (!filters.entire) {
            let filteredKeys = Object.keys(filters).filter(x => filters[x]);
            if (filteredKeys.includes('workshop') && myScheduleFilter === false) {
                filteredKeys[filteredKeys.indexOf('workshop')] = 'group';
            }

            filteredSchedule = filteredSchedule.filter(activity => {
                return filteredKeys.includes(activity.type);
            });
        }


        const scheduleDates = scheduleByDate(filteredSchedule, myScheduleFilter);

        return (
            <View style={t.flex1}>
                <NavBar title={navLabel} />
                <ScheduleList
                    schedule={scheduleDates}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    onAdd={this.onAdd}
                    plusMinusCheck={this.checkIfInPersonalSchedule}
                />
                <View style={[t.flexRow]}>
                    <View style={[t.flex1]}>
                        {myScheduleFilter ?
                            <TouchableOpacity style={[t.borderR, t.borderT, t.borderGray400, t.pB8, t.pT1, t.bgGray300]}>
                                <Button title="Entire Schedule" onPress={this.handleScheduleToggle} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={[t.borderR, t.borderT, t.borderGray400, t.pB8, t.pT1, t.bgGray300]}>
                                <Button title="My Schedule" onPress={this.handleScheduleToggle} />
                            </TouchableOpacity>
                        }
                    </View>
                    <Filters filters={filters} onClose={this.onFiltersClose} />
                </View>
            </View>
        );
    }

    render() {
        const { schedule, mySchedule } = this.state;

        AsyncStorage.removeItem('schedule');

        if (schedule.length === 0 && mySchedule.length === 0) { //make better
            return this.renderLoading();
        }

        return this.renderContent();
    }
}