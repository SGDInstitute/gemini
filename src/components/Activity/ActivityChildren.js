import React from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

import GroupedActivity from './GroupedActivity';

export default class ActivityChildren extends React.Component {
    render() {
        const { children, onAdd, plusMinusCheck } = this.props;

        return (
            <View style={[t.bgGray200, t.mT4, t.p4, t._m4]}>
                {children.map(
                    (activity) => (
                        <GroupedActivity
                            key={activity.id}
                            activity={activity}
                            onAdd={onAdd}
                            plusMinusCheck={plusMinusCheck}
                        />
                    ))
                }
            </View>
        );
    }
}