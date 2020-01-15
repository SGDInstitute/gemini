import React from 'react';
import { AsyncStorage, RefreshControl, ScrollView, View, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { t } from 'react-native-tailwindcss';

import ScheduleList from '../../components/ScheduleList';
import { scheduleByDate } from '../../utils/schedule';
import { getUserActivities, storeUserActivities } from "../../utils/api";

import styles from "../styles";

export default class PersonalSchedule extends React.Component {
    state = {
        mySchedule: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getMySchedule();
    }

    onAdd = (id) => {
        storeUserActivities(id).then(() => {
            this.refreshMySchedule();
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });

        this.refreshMySchedule().then(() => this.setState({ refreshing: false }));
    }

    getMySchedule = async () => {
        const mySchedule = await AsyncStorage.getItem('my-schedule');

        if (mySchedule) {
            this.setState({ mySchedule: JSON.parse(mySchedule) });
        } else {
            let mySchedule = (await getUserActivities()).payload;
            this.setState({ mySchedule: mySchedule });
        }
    }

    refreshMySchedule = async () => {
        let mySchedule = (await getUserActivities()).payload;
        this.setState({ mySchedule: mySchedule });
    }

    render() {
        const { mySchedule } = this.state;

        if (mySchedule.length > 0) {
            return (
                <View style={t.flex1}>
                    <NavigationEvents
                        onWillFocus={payload => this.refreshMySchedule()}
                    />
                    <ScheduleList
                        schedule={scheduleByDate(mySchedule, false)}
                        navigation={this.props.navigation}
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        onAdd={this.onAdd}
                    />
                </View>
            );
        }

        return (
            <View style={t.flex1}>
                <ScrollView
                    contentContainerStyle={[styles.p4]}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }>
                    <Text>Nothing is in your schedule! Go back to the entire schedule and press a plus button to add them.</Text>
                </ScrollView>
            </View>
        );
    }
}