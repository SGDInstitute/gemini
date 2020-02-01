import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function CheckinTutorial({ onClose }) {
    return (
        <View style={[t.bgWhite, t.p4, t.justifyCenter, t.itemsCenter, t.rounded, t.mX4]}>
            <ScrollView style={t.p4}>
                <Text style={[t.mB4, t.textLg]}>It’s time to check in for MBLGTACC 2020!</Text>
                <Text style={[t.mB4]}>Check in now and we’ll print your name badge so it’s ready when you arrive. Start by selecting your name, or all of the names in your group, and then tap “Print”. It’s that easy! You can also edit your name and pronouns before tapping “Print.”</Text>
                <Text style={[t.mB4]}>Once you tap “Print”, your name(s) will move to the “Checked In” section. Once we’ve finished printing your name badges, your name(s) will move to the “Printed” section.</Text>
                <Text style={[t.mB4]}>Once your name is in the “Printed” section, your name badge is ready for pickup! Pickup is in Bernhard 105-107.</Text>

                <TouchableOpacity>
                    <Button style={t.mT2} onPress={onClose} title="Close" />
                </TouchableOpacity>
            </ScrollView>
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