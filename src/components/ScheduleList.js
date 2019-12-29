import React from 'react';
import { FlatList, Text, SectionList } from 'react-native';
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';

import Activity from './Activity';

import schedule from '../../assets/data/schedule.json';

export default class ScheduleList extends React.Component {
    scheduleByDate = (schedule) => {
        const days = schedule.reduce((days, activity) => {
            const date = activity.start.split(' ')[0];

            if (!days[date]) {
                days[date] = [];
            }

            if (activity.type !== "workshop") {
                days[date].push(activity);
            } else {
                days[date].map((a) => {
                    if (a.type === 'group' && a.start === activity.start && a.end === activity.end) {
                        if (!a['children']) {
                            a['children'] = [];
                        }

                        a['children'].push(activity);
                    }

                    return a;
                });
            }

            return days;
        }, {});

        const sectionList = Object.keys(days).map((date) => {
            return {
                date,
                dayOfWeek: dayjs(date).format('dddd'),
                data: days[date]
            };
        });

        return sectionList
    }

    renderActivity = ({ item }) => (
        <Activity
            activity={item}
        />
    );

    renderHeader = ({ section: { dayOfWeek } }) => (
        <Text style={[t.bgGray200, t.p4, t.textLg, t.border, t.borderGray400]}>{dayOfWeek}</Text>
    );

    render() {
        return (
            <SectionList
                sections={this.scheduleByDate(schedule)}
                keyExtractor={(item, index) => item + index}
                renderItem={this.renderActivity}
                renderSectionHeader={this.renderHeader}
            />
        );
    }
}