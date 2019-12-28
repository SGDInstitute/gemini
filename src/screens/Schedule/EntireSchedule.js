import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { t } from 'react-native-tailwindcss';

import ScheduleList from '../../components/ScheduleList';

export default class EntireSchedule extends React.Component {
    render() {
        return (
            <View style={t.flex1}>
                <ScheduleList />
            </View>
        );
    }
}