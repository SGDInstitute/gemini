import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LocationModal from './LocationModal';

import types from '../../../assets/data/types.json';

export default class Location extends React.Component {
    state = {
        isModalVisible: false
    }

    handleCenterPress = () => {
        this.props.onCenterPress(this.props.location);
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    renderModal = () => {
        const { location } = this.props;

        return (
            <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={this.toggleModal}
                onBackButtonPress={this.toggleModal}
                style={{
                    marginTop: 80,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                }}
            >
                <LocationModal location={location} onClose={this.toggleModal} />
            </Modal>
        );
    }

    render() {
        const { type, title, onCenterPress } = this.props.location;
        const { isOpen } = this.state;

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
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.toggleModal}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg, t.pY2]}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.handleCenterPress}><MaterialCommunityIcons name="crosshairs-gps" size={28} /></TouchableOpacity>
                    </View>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}