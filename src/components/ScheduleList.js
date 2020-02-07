import React from 'react';
import { RefreshControl, Text, SectionList, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import Activity from './Activity/Activity';

export default class ScheduleList extends React.Component {
    renderActivity = ({ item }) => {
        const { onAdd, plusMinusCheck } = this.props;
        return (
            <Activity activity={item} onAdd={onAdd} plusMinusCheck={plusMinusCheck} />
        );
    }

    renderEmpty = () => {
        return <View style={[t.flex1, t.itemsCenter, t.mT8, t.mX8]}><Text style={[t.textXl, t.textCenter]}>Nothing scheduled.</Text></View>
    }

    renderHeader = ({ section: { dayOfWeek } }) => (
        <Text style={[t.bgGray200, t.p4, t.textLg, t.border, t.borderGray400]}>{dayOfWeek}</Text>
    );

    render() {
        const { refreshing, onRefresh, schedule } = this.props;

        return (
            <SectionList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                sections={schedule}
                keyExtractor={item => item.id}
                renderItem={this.renderActivity}
                renderSectionHeader={this.renderHeader}
                ListEmptyComponent={this.renderEmpty}
            />
        );
    }
}