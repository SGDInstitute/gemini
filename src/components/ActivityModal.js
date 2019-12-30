import React from 'react';
import { Text, Button, ScrollView } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function ActivityModal({ activity, onClose }) {
    return (
        <ScrollView style={[t.flex1, t.bgWhite, t.rounded, t.p4, t.pB12]}>
            <Text>{activity.title}</Text>
            <Text>{activity.schedule}</Text>
            <Text>{activity.type}</Text>
            <Text>{activity.start}</Text>
            <Text>{activity.end}</Text>
            <Text>{activity.speaker}</Text>
            <Text>{activity.description}</Text>
            <Button title="Hide" onPress={onClose} />
        </ScrollView>
    );
}
