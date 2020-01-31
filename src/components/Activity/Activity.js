import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import Children from './ActivityChildren';
import ActivityModal from './ActivityModal';

export default class Activity extends React.Component {
    state = {
        isOpen: false,
        isModalVisible: false,
        isInPersonalSchedule: false,
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleAdd = () => {
        this.setState({ isInPersonalSchedule: !this.state.isInPersonalSchedule });
        const { activity, onAdd } = this.props;

        onAdd(activity.id);
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
            const { activity, plusMinusCheck } = this.props;

            return (
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                    style={{
                        marginTop: Constants.statusBarHeight,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                >
                    <ActivityModal activity={activity} plusMinusCheck={plusMinusCheck} onAdd={this.handleAdd} onClose={this.toggleModal} />
                </Modal>
            );
        }

        return null;
    }

    renderSpeakers = () => {
        const { speakers } = this.props.activity;

        return speakers.map((speaker) => {
            if (speaker.pronouns) {
                return <Text style={[t.textGray700, t.mTPx]} key={speaker.name}>{speaker.name} <Text style={[t.italic]}>({speaker.pronouns})</Text></Text>
            } else {
                return <Text style={[t.textGray700, t.mTPx]} key={speaker.name}>{speaker.name}</Text>
            }
        })
    }

    render() {
        const { title, color, location, room, start, end, workshops, id } = this.props.activity;
        const { hideTime, onAdd, plusMinusCheck } = this.props;
        const { isOpen, isInPersonalSchedule } = this.state;

        const formattedStart = dayjs(start).format('h:mm a');
        const formattedEnd = dayjs(end).format('h:mm a');

        let openCloseButton;

        if (isOpen) {
            openCloseButton = <TouchableOpacity onPress={this.handleClose}><MaterialCommunityIcons name="chevron-down" size={32} /></TouchableOpacity>;
        } else {
            openCloseButton = <TouchableOpacity onPress={this.handleOpen}><MaterialCommunityIcons name="chevron-right" size={32} /></TouchableOpacity>;
        }

        let plusMinusButton;

        if (plusMinusCheck(id)) {
            plusMinusButton = <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="minus-circle-outline" size={28} /></TouchableOpacity>;
        } else {
            plusMinusButton = <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="plus-circle-outline" size={28} /></TouchableOpacity>;
        }

        return (
            <View style={t.p4}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderLeftWidth: 3,
                    borderLeftColor: color,
                    paddingLeft: 10
                }}>
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.toggle}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg]}>{title}</Text>
                            {this.renderSpeakers()}
                            {!hideTime && <Text style={t.mT2}><Text style={t.textGray700}>{formattedStart}</Text> - <Text style={t.textGray700}>{formattedEnd}</Text></Text>}
                            {location !== null && <Text style={t.textGray700}>{location}{room !== null && <Text> - {room}</Text>}</Text>}
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            workshops
                                ? openCloseButton
                                : plusMinusButton
                        }
                    </View>
                </View>
                {(isOpen && workshops) && <Children children={workshops} onAdd={onAdd} plusMinusCheck={plusMinusCheck} />}
                {this.renderModal()}
            </View>
        );
    }
}