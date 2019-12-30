import React from 'react';
import { Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from 'react-native-elements';
import dayjs from 'dayjs';

import types from '../../assets/data/types.json';

export default function ActivityModal({ activity, onClose }) {
    const formattedStart = dayjs(activity.start).format('dddd h:mm a');
    const formattedEnd = dayjs(activity.end).format('h:mm a');
    const activityTypeBg = types[activity.type].bgColor;
    const activityTypeText = types[activity.type].textColor;

    return (
        <ScrollView style={[t.flex1, t.bgWhite, t.roundedLg, t.pB12]}>
            <View style={{
                backgroundColor: activityTypeBg,
                height: 150,
                padding: 15,
                justifyContent: 'flex-end',
            }}>
                <TouchableOpacity onPress={onClose} style={[t.absolute, t.top0, t.right0, t.m4]}>
                    <MaterialCommunityIcons name="close-circle" size={32} />
                </TouchableOpacity>
                <Text style={[t.textXl, t[activityTypeText]]}>{activity.title}</Text>
            </View>
            <View style={[t.p4, t.justifyBetween, t.flexRow, t.bgGray200]}>
                <Text>
                    <Text>{formattedStart}</Text> - <Text>{formattedEnd}</Text>
                </Text>
                <Text>{activity.location}</Text>
            </View>
            <View style={[t.p4,]}>
                <Button title="Add to My Schedule" onPress={onClose} />
                <Button title="Add to My Schedule" onPress={onClose} />
            </View>
            <View style={[t.p4,]}>
                <Text>{activity.speaker}</Text>
                <Text>{activity.description}</Text>
            </View>
        </ScrollView>
    );
}
