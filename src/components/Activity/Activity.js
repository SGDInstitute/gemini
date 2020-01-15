import React from 'react';
import { AsyncStorage, View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import Children from './ActivityChildren';
import ActivityModal from './ActivityModal';

import { storeUserActivities } from "../../utils/api";

export default class Activity extends React.Component {
    state = {
        isOpen: false,
        isModalVisible: false,
        isInPersonalSchedule: false,
    }

    componentDidMount = async () => {
        this.checkIfInPersonalSchedule(this.props.activity.id);
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleAdd = () => {
        const { id } = this.props.activity;
        storeUserActivities(id);
    }

    checkIfInPersonalSchedule = async (id) => {
        let mySchedule = await AsyncStorage.getItem('my-schedule');

        if (mySchedule) {
            mySchedule = JSON.parse(mySchedule);
            const found = mySchedule.find(x => x.id === id);
            if (typeof found !== 'undefined') {
                this.setState({ isInPersonalSchedule: true });
            }
        }
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
                    style={{
                        marginTop: Constants.statusBarHeight,
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
        const { title, color, location, speaker, start, end, workshops, id } = this.props.activity;
        const { hideTime } = this.props;
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

        if (isInPersonalSchedule) {
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
                            {speaker !== '' && <Text style={t.textGray700}>{speaker}</Text>}
                            {!hideTime && <Text style={t.mT2}><Text style={t.textGray700}>{formattedStart}</Text> - <Text style={t.textGray700}>{formattedEnd}</Text></Text>}
                            <Text style={t.textGray700}>{location}</Text>
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
                {(isOpen && workshops) && <Children children={workshops} />}
                {this.renderModal()}
            </View>
        );
    }
}