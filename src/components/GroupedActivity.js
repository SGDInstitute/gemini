import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import types from '../../assets/data/types.json';

export default class GroupedActivity extends React.Component {
    handleAdd = () => {
        alert('Added to your Schedule! (Not Really)');
    }

    render() {
        const { title, type, location, speaker } = this.props.activity;

        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 15,
                    borderLeftWidth: 3,
                    borderLeftColor: types[type],
                    paddingLeft: 10
                }}>
                    <View style={{ width: '90%', }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg, t.mB2]}>{title}</Text>
                            {speaker && <Text>{speaker}</Text>}
                            <Text style={t.textGray700}>{location}</Text>
                        </View>
                    </View>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="plus-circle-outline" size={28} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}