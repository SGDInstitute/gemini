import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import types from '../../../assets/data/types.json';

export default class Location extends React.Component {
    handleCenterPress = () => {
        this.props.onCenterPress(this.props.location);
    }

    handleLocationPress = () => {
        return this.props.navigation.navigate('Location', {
            location: JSON.stringify(this.props.location),
        });
    }

    render() {
        const { type, title, description, onCenterPress } = this.props.location;

        const locationTypeBg = types[type].bgColor;

        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 15,
                    borderLeftWidth: 3,
                    borderLeftColor: locationTypeBg,
                    paddingLeft: 10
                }}>
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.handleLocationPress}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg, t.pT2]}>{title}</Text>
                            <Text style={[t.textGray700, t.italic, t.pB2]}>{description}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.handleCenterPress}><MaterialCommunityIcons name="crosshairs-gps" size={28} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}