import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from 'dayjs';

import types from '../../../assets/data/types.json';

export default function ActivityModal({ activity, onClose, onAdd, plusMinusCheck }) {
    const formattedStart = dayjs(activity.start).format('dddd h:mm a');
    const formattedEnd = dayjs(activity.end).format('h:mm a');
    const activityTypeBg = activity.color;
    const activityTypeText = activity.text_color;
    let plusMinusButton;

    if (plusMinusCheck(activity.id)) {
        plusMinusButton = <TouchableOpacity onPress={onAdd}><Text style={styles.btn}>Remove from My Schedule</Text></TouchableOpacity>;
    } else {
        plusMinusButton = <TouchableOpacity onPress={onAdd}><Text style={styles.btn}>Add to My Schedule</Text></TouchableOpacity>;
    }

    let speakers = activity.speakers.map((speaker) => {
        if (speaker.pronouns) {
            return <Text style={[t.textGray700, t.mTPx]} key={speaker.name}>{speaker.name} <Text style={[t.italic]}>({speaker.pronouns})</Text></Text>
        } else {
            return <Text style={[t.textGray700, t.mTPx]} key={speaker.name}>{speaker.name}</Text>
        }
    });

    return (
        <View style={[t.flex1, t.bgWhite, t.roundedLg, t.overflowHidden]}>
            <View style={{
                backgroundColor: activityTypeBg,
                height: 150,
                padding: 15,
                justifyContent: 'flex-end',
            }}>
                <TouchableOpacity onPress={onClose} style={[t.absolute, t.top0, t.right0, t.m4]}>
                    <MaterialCommunityIcons name="close-circle" size={32} />
                </TouchableOpacity>
                <Text style={{ color: activityTypeText, fontSize: 24 }}>{activity.title}</Text>
            </View>
            <View style={[t.p4, t.justifyBetween, t.flexRow, t.bgGray200]}>
                <Text>
                    <Text>{formattedStart}</Text> - <Text>{formattedEnd}</Text>
                </Text>
                <Text>{activity.location}</Text>
            </View>
            <View style={t.flex1}>
                <ScrollView style={t.p4}>
                    <View style={[t.flexRow, t.mB4]}>
                        {plusMinusButton}
                        <TouchableOpacity onPress={onClose}>
                            <MaterialCommunityIcons style={styles.btnSecondary} name="close" />
                        </TouchableOpacity>
                    </View>
                    {speakers}
                    {activity.description !== null && <Text style={{ lineHeight: 20, paddingBottom: 50 }}>{activity.description}</Text>}
                </ScrollView>
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