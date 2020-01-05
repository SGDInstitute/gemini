import React from 'react';
import { Button, View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

import ScheduleTabs from '../navigation/ScheduleTabs';
import NavBar from '../components/NavBar';

export default class Schedule extends React.Component {
    static router = ScheduleTabs.router;

    render() {
        return (
            <View style={t.flex1}>
                <NavBar title="Schedule" />
                <ScheduleTabs navigation={this.props.navigation} />
            </View>
        );
    }
}