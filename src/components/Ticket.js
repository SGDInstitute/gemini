

import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import Constants from 'expo-constants';

import Card from './Card';
import TicketModal from './TicketModal';

export default class Ticket extends React.Component {
    state = {
        isModalVisible: false,
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    renderModal = () => {
        const { ticket, onSave } = this.props;

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
                <TicketModal ticket={ticket} onSave={onSave} onClose={this.toggleModal} />
            </Modal>
        );
    }

    render() {
        const { ticket, isChecked, onCheck } = this.props;

        let checked = isChecked;
        let checkedColor = '#bfbfbf';

        if (ticket.in_queue) {
            checkedColor = 'blue';
            checked = true;
        }
        if (ticket.is_printed) {
            checkedColor = 'green';
            checked = true;
        }

        return (
            <View style={[t.p2, t.borderB, t.borderGray400]}>
                <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
                    <CheckBox
                        title={ticket.user !== null ?
                            <Text>{ticket.user.name} <Text style={[t.italic]}>({ticket.user.pronouns})</Text></Text> :
                            <Text style={[t.italic]}>No user added to ticket</Text>
                        }
                        checked={checked}
                        checkedColor={checkedColor}
                        containerStyle={{ backgroundColor: 'transparent', padding: 0, shadowOpacity: 0, borderColor: 'transparent' }}
                        onPress={() => onCheck(ticket.id)}
                    />
                    <TouchableOpacity><Button title="Edit" onPress={this.toggleModal} /></TouchableOpacity>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}