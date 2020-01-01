import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Children from './ActivityChildren';
import ActivityModal from './ActivityModal';

import types from '../../../assets/data/types.json';

export default class Activity extends React.Component {
    state = {
        isOpen: false,
        isModalVisible: false
    };

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleAdd = () => {
        alert('Added to your Schedule! (Not Really)');
    }

    toggle = () => {
        if (this.props.activity.type === 'group') {
            this.setState({ isOpen: !this.state.isOpen });
        }

        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    renderModal = () => {
        if (this.props.activity.type !== 'group') {
            const { activity } = this.props;

            return (
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                    onSwipeComplete={this.toggleModal}
                    swipeDirection="down"
                    swipeThreshold={40}
                    style={{
                        marginTop: 80,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                >
                    <ActivityModal activity={activity} onAdd={this.handleAdd} onClose={this.toggleModal} />
                </Modal>
            );
        }

        return null;
    }

    render() {
        const { title, type, location, speaker, start, end, children } = this.props.activity;
        const { hideTime } = this.props;
        const { isOpen } = this.state;

        const formattedStart = dayjs(start).format('h:mm a');
        const formattedEnd = dayjs(end).format('h:mm a');
        const activityTypeBg = types[type].bgColor;

        let openCloseButton;

        if (isOpen) {
            openCloseButton = <TouchableOpacity onPress={this.handleClose}><MaterialCommunityIcons name="chevron-down" size={32} /></TouchableOpacity>;
        } else {
            openCloseButton = <TouchableOpacity onPress={this.handleOpen}><MaterialCommunityIcons name="chevron-right" size={32} /></TouchableOpacity>;
        }

        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 15,
                    borderLeftWidth: 3,
                    borderLeftColor: activityTypeBg,
                    paddingLeft: 10
                }}>
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.toggle}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg]}>{title}</Text>
                            {speaker !== '' && <Text style={t.textGray700}>{speaker}</Text>}
                            {!hideTime && <Text style={t.mT2}><Text style={t.textGray700}>{formattedStart}</Text> - <Text style={t.textGray700}>{formattedEnd}</Text></Text>}
                            <Text style={t.textGray700}>{location}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            children
                                ? openCloseButton
                                : <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="plus-circle-outline" size={28} /></TouchableOpacity>
                        }
                    </View>
                </View>
                {(isOpen && children) && <Children children={children} />}
                {this.renderModal()}
            </View>
        );
    }
}