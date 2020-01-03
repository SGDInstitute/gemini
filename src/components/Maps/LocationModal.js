import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScheduleList from '../ScheduleList.js';
import { scheduleByDate } from '../../utils/schedule';

import types from '../../../assets/data/types.json';
import schedule from '../../../assets/data/schedule.json';

const scheduleByLocation = location => {
    const filteredActivities = schedule.filter(activity => {
        if (activity.location.includes('/')) {
            const splitLocation = activity.location.split('/');

            let flag = false;
            splitLocation.forEach(element => {
                if (location.title === element) {
                    flag = true;
                }
            });

            return flag;
        }
        return activity.location === location.title;
    });

    return scheduleByDate(filteredActivities);
}

export default function LocationModal({ location, onClose }) {
    const locationTypeBg = types[location.type].bgColor;
    const locationTypeText = types[location.type].textColor;

    return (
        <View style={[t.flex1, t.bgWhite, t.roundedLg, t.overflowHidden]}>
            <View style={{
                backgroundColor: locationTypeBg,
                height: 150,
                padding: 15,
                justifyContent: 'flex-end',
            }}>
                <TouchableOpacity onPress={onClose} style={[t.absolute, t.top0, t.right0, t.m4]}>
                    <MaterialCommunityIcons name="close-circle" size={32} />
                </TouchableOpacity>
                <Text style={[t.textXl, t[locationTypeText]]}>{location.title}</Text>
            </View>
            <View style={t.flex1}>
                <View style={[t.p4, t.flexRow]}>
                    <TouchableOpacity onPress={() => alert('Open in Maps Application - TODO')}>
                        <Text style={styles.btn}>Open in Maps</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialCommunityIcons style={styles.btnSecondary} name="close" />
                    </TouchableOpacity>
                </View>
                <ScheduleList style={[t.flex1]} schedule={scheduleByLocation(location)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#009999',
        borderRadius: 6,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        height: 32,
        marginRight: 8
    },
    btnSecondary: {
        backgroundColor: '#aeb3bf',
        borderRadius: 6,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        height: 32,
        marginRight: 8
    },
});