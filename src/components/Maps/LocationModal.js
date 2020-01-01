import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import types from '../../../assets/data/types.json';

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
                <ScrollView style={t.p4}>
                    <View style={[t.flexRow, t.mB4]}>
                        <TouchableOpacity onPress={() => alert('Open in Maps Application - TODO')}>
                            <Text style={styles.btn}>Open in Maps</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialCommunityIcons style={styles.btnSecondary} name="close" />
                        </TouchableOpacity>
                    </View>
                    <Text>Location's Schedule either Workshop or Shuttle times</Text>
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