import React from 'react';
import { FlatList, Text, SectionList } from 'react-native';
import { t } from 'react-native-tailwindcss';

import Activity from './Activity/Activity';

export default class ScheduleList extends React.Component {
    renderActivity = ({ item }) => (
        <Activity activity={item} />
    );

    renderHeader = ({ section: { dayOfWeek } }) => (
        <Text style={[t.bgGray200, t.p4, t.textLg, t.border, t.borderGray400]}>{dayOfWeek}</Text>
    );

    render() {
        const { schedule } = this.props;

        return (
            <SectionList
                sections={schedule}
                keyExtractor={(item, index) => item.id + index}
                renderItem={this.renderActivity}
                renderSectionHeader={this.renderHeader}
            />
        );
    }
}