import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ActivityModal from './ActivityModal';

import types from '../../assets/data/types.json';

export default class GroupedActivity extends React.Component {
    state = {
        isModalVisible: false
    };

    handleAdd = () => {
        alert('Added to your Schedule! (Not Really)');
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    renderModal() {
        if (this.props.activity.type !== 'group') {
            const { activity } = this.props;

            return (
                <Modal
                    isVisible={this.state.isModalVisible}
                    style={{
                        marginTop: 80,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                >
                    <ActivityModal activity={activity} onClose={this.toggleModal} />
                </Modal>
            );
        }

        return null;
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
                    <TouchableOpacity style={{ width: '90%', }} onPress={this.toggleModal}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={[t.textLg, t.mB2]}>{title}</Text>
                            {speaker && <Text>{speaker}</Text>}
                            <Text style={t.textGray700}>{location}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '10%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={this.handleAdd}><MaterialCommunityIcons name="plus-circle-outline" size={28} /></TouchableOpacity>
                    </View>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}