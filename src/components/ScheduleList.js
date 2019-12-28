import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';

import Activity from './Activity';

import schedule from '../../assets/data/schedule.json';

export default class ScheduleList extends React.Component {
    scheduleByDate = (schedule) => {
        const groups = schedule.reduce((groups, activity) => {
            const date = activity.start.split(' ')[0];

            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(activity);

            return groups;
        }, {});

        const groupArrays = Object.keys(groups).map((date) => {
            return {
                date,
                dayOfWeek: dayjs(date).format('dddd'),
                activities: groups[date]
            };
        });
        return groupArrays
    }

    renderActivity = ({ item: { id, schedule, title, description, type, location, start, end } }) => (
        <Activity
            id={id}
            schedule={schedule}
            title={title}
            description={description}
            type={type}
            location={location}
            start={start}
            start={start}
            end={end}
        />
    );

    renderDayHeader = dayOfWeek => (
        <Text style={[t.bgGray100, t.p4, t.textLg, t.borderY]}>{dayOfWeek}</Text>
    );

    renderActivities = ({ item: { date, dayOfWeek, activities } }) => (
        <FlatList
            data={activities}
            renderItem={this.renderActivity}
            ListHeaderComponent={this.renderDayHeader(dayOfWeek)}
            keyExtractor={item => item.id}
        />
    );

    render() {
        return (
            <FlatList
                data={this.scheduleByDate(schedule)}
                renderItem={this.renderActivities}
                keyExtractor={item => item.date}
            />
        );
    }
}