import React from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';

import ScheduleList from '../../components/ScheduleList';
import { scheduleByDate } from '../../utils/schedule';

import schedule from '../../../assets/data/schedule';

export default class EntireSchedule extends React.Component {
    render() {
        return (
            <View style={t.flex1}>
                <ScheduleList schedule={scheduleByDate(schedule)} navigation={this.props.navigation} />
            </View>
        );
    }
}