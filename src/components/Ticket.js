import React from 'react';
import { AsyncStorage, Button, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Modal from "react-native-modal";
import { t } from 'react-native-tailwindcss';
import Constants from 'expo-constants';

import { getOrders, getUser } from "../utils/api";

import TicketModal from './TicketModal';

export default class Ticket extends React.Component {
    state = {
        isModalVisible: false,
        user: [],
        order: [],
    }

    componentDidMount() {
        this.getUser();
        this.getOrder();
    }

    getUser = async () => {
        const user = await AsyncStorage.getItem('user');

        if (user) {
            this.setState({ user: JSON.parse(user) });
        } else {
            let user = (await getUser()).payload;
            this.setState({ user: user });
        }
    }

    getOrder = async () => {
        let orders = await AsyncStorage.getItem('orders');


        if (orders) {
            orders = JSON.parse(orders);
        } else {
            orders = (await getOrders('orders')).payload;
        }

        const order = orders.find(x => x.id === this.props.ticket.order);
        this.setState({ order: order });
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    handlePress = () => {
        const { ticket, unpaid } = this.props;

        if (unpaid) {
            Alert.alert(
                'Ope!',
                'It looks like your order hasn’t been paid. Please pay before checking in by tapping on the “Pay Now” button below.',
                [
                    { text: "Pay Now", onPress: () => Linking.openURL('https://apps.sgdinstitute.org/orders/' + ticket.order) },
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ]
            );
        } else if (ticket.user.name === '' || ticket.user.name === null) {
            Alert.alert('Ope!', "Looks like this attendee is missing a name! Please edit the attendee first, and then select for printing.");
        } else {
            this.props.onCheck(ticket.id);
        }
    }

    renderEdit = () => {
        if (this.props.ticket.user.id === this.state.user.id) {
            return <TouchableOpacity><Button title="Edit" onPress={this.toggleModal} /></TouchableOpacity>;
        } else if (this.state.order.owner_id === this.state.user.id) {
            return <TouchableOpacity><Button title="Edit" onPress={this.toggleModal} /></TouchableOpacity>;
        } else {
            return null;
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
                    {this.renderEdit()}
                </View>
                {this.renderModal()}
            </View>
        );
    }
}