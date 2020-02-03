import React from 'react';
import { Button, Text, TouchableOpacity, View, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import Constants from 'expo-constants';

import TicketModal from './TicketModal';

export default class Ticket extends React.Component {
    state = {
        isModalVisible: false,
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    handlePress = () => {
        const { ticket } = this.props;

        if (ticket.user.name === '' || ticket.user.name === null) {
            Alert.alert('Whoops!', "Looks like this attendee is missing a name! Please edit the attendee first, and then select for printing.");
        } else {
            this.props.onCheck(ticket.id);
        }
    }

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
        const { ticket, isChecked } = this.props;

        let checked = isChecked;
        let checkedColor = '#009999';

        if (ticket.in_queue) {
            checked = true;
        }
        if (ticket.is_printed) {
            checked = true;
        }

        let title = '';
        if (ticket.user !== null && ticket.user.name !== null && ticket.user.pronouns !== null) {
            title = <Text>{ticket.user.name} <Text style={[t.italic]}>({ticket.user.pronouns})</Text></Text>;
        } else if (ticket.user !== null && ticket.user.name !== null) {
            title = <Text>{ticket.user.name}</Text>;
        } else if (ticket.user !== null) {
            title = <Text>{ticket.user.email}</Text>;
        } else {
            title = <Text style={[t.italic]}>No user added to ticket</Text>
        }

        return (
            <View style={[t.p4, t.borderB, t.borderGray200]}>
                <View style={[t.flexRow, t.justifyBetween, t.itemsCenter]}>
                    <CheckBox
                        title={title}
                        checked={checked}
                        checkedColor={checkedColor}
                        containerStyle={{ backgroundColor: 'transparent', padding: 0, shadowOpacity: 0, borderColor: 'transparent' }}
                        onPress={this.handlePress}
                    />
                    <TouchableOpacity><Button title="Edit" onPress={this.toggleModal} /></TouchableOpacity>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}