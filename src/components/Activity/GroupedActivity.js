import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';

import ActivityModal from './ActivityModal';

export default class GroupedActivity extends React.PureComponent {
    state = {
        isModalVisible: false,
        isInPersonalSchedule: false,
    }

    handleAdd = () => {
        const { activity, onAdd } = this.props;

        onAdd(activity.id);
        this.setState({ isInPersonalSchedule: !this.state.isInPersonalSchedule });
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
                    onBackButtonPress={this.toggleModal}
                    onBackdropPress={this.toggleModal}
                    style={{
                        marginTop: Constants.statusBarHeight,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                >
                    <ActivityModal activity={activity} plusMinusCheck={plusMinusCheck} onClose={this.toggleModal} onAdd={this.handleAdd} />
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
        const { title, location, room, speaker, color, id } = this.props.activity;
        const { plusMinusCheck } = this.props;
        const activityTypeBg = color;

        let plusMinusButton;

        if (plusMinusCheck(id)) {
            plusMinusButton = <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="minus-circle-outline" size={28} /></TouchableOpacity>;
        } else {
            plusMinusButton = <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="plus-circle-outline" size={28} /></TouchableOpacity>;
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
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.toggleModal}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg, t.mB2]}>{title}</Text>
                            {this.renderSpeakers()}
                            {location !== null && <Text style={t.textGray700}>{location}{room !== null && <Text> - {room}</Text>}</Text>}
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {plusMinusButton}
                    </View>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}