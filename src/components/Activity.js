import React from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';

export default class Activity extends React.Component {
    render() {
        const { title, type, location, start, end } = this.props;

        const formattedStart = dayjs(start).format('h:mm a');
        const formattedEnd = dayjs(end).format('h:mm a');

        return (
            <View style={[t.m4, t.borderL4, t.borderGreen500, t.pL4]}>
                <Text style={[t.textLg, t.mB2]}>{title}</Text>
                <Text>
                    <Text style={t.textGray700}>{formattedStart}</Text> - <Text style={t.textGray700}>{formattedEnd}</Text> | <Text style={t.textGray700}>{location}</Text>
                </Text>
            </View>
        );
    }
}