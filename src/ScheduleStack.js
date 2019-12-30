import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import EntireSchedule from './screens/Schedule/EntireSchedule';
import Activity from './screens/Schedule/Activity';

const Stack = createStackNavigator(
    {
        EntireSchedule,
        Activity
    },
    {
        headerMode: 'none',
    });

export default class ScheduleStack extends React.Component {
    static router = Stack.router;

    render() {
        const { navigation } = this.props;

        return <Stack navigation={navigation} />;
    }
}