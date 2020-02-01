import React from 'react';
import { AsyncStorage, Button, ScrollView, Text, TouchableOpacity, View, RefreshControl, SectionList, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import Ticket from '../components/Ticket';

import { getOrders, storeTicketsInQueue } from '../utils/api';
import styles from "./styles";
import { FlatList } from 'react-native-gesture-handler';

export default class Checkin extends React.Component {
    state = {
        orders: [],
        refreshing: false,
        print: [],
    }

    componentDidMount = async () => {
        this.getOrders();
    }

    getOrders = async () => {
        const orders = await AsyncStorage.getItem('orders');

        if (orders) {
            this.setState({ orders: JSON.parse(orders) });
        } else {
            let orders = (await getOrders('orders')).payload;
            this.setState({ orders: orders });
        }
    }

    handleCheck = (id) => {
        if (this.state.print.includes(id)) {
            this.setState({ toPrint: this.state.print.splice(this.state.print.indexOf(id), 1) });
        } else {
            this.setState({ toPrint: this.state.print.push(id) });
        }
    }

    handlePrint = async () => {
        const { print } = this.state;

        let response = await storeTicketsInQueue(print);
        if (response.type === 'success') {
            Alert.alert(
                'Success',
                'You have successfully added ' + print.length + ' tickets to the queue.',
                [
                    { text: 'OK', onPress: () => this.refreshOrders() },
                ],
                { cancelable: false },
            );
        } else {
            alert('Whoops looks like there was an issue. Please try again later. Error: ' + response.payload.message);
        }
    }

    groupTicketsByState = (tickets) => {
        let starting = [{ title: 'Tickets that need to be Checked-in', key: 'needed', data: [] }, { title: 'Checked-in Tickets', key: 'queued', data: [] }, { title: 'Printed Tickets', key: 'printed', data: [] }];

        return tickets.reduce((grouped, ticket) => {
            if (ticket.in_queue === true && ticket.is_printed === true) {
                grouped[2].data.push(ticket);
            } else if (ticket.in_queue === true && ticket.is_printed === false) {
                grouped[1].data.push(ticket);
            } else {
                grouped[0].data.push(ticket);
            }

            return grouped;
        }, starting);
    }

    refreshOrders = async () => {
        this.setState({ refreshing: true });
        let orders = (await getOrders('orders')).payload;
        this.setState({ orders: orders });
        this.setState({ refreshing: false });
    }

    renderTicket = ({ item }) => {
        const isChecked = this.state.print.includes(item.id);
        return <Ticket onCheck={this.handleCheck} onSave={this.refreshOrders} ticket={item} isChecked={isChecked} />;
    }

    renderOrder = ({ item }) => {
        return (
            <View style={[t.mB4]}>
                <Text style={[t.bgGray200, t.p4, t.textLg, t.border, t.borderGray400]}>Order: #{item.id}</Text>
                <SectionList
                    sections={this.groupTicketsByState(item.tickets)}
                    keyExtractor={(item) => 'ticket' + item.id}
                    renderItem={this.renderTicket}
                    renderSectionHeader={({ section: { title, data } }) => {
                        if (data.length > 0) {
                            return <Text style={[t.p4, t.border, t.borderGray400, t.fontMedium]}>{title}</Text>;
                        }
                        return (
                            <View>
                                <Text style={[t.p4, t.border, t.borderGray400, t.fontMedium]}>{title}</Text>
                                <Text style={[t.p4]}>No {title} right now.</Text>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }

    render() {
        const { refreshing, orders } = this.state;

        return (
            <View style={styles.flex1}>
                <NavBar title="Check In" />
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.refreshOrders} />
                    }
                    data={orders}
                    renderItem={this.renderOrder}
                    keyExtractor={item => 'order' + item.id}
                />
                <TouchableOpacity style={[t.borderR, t.borderT, t.borderGray400, t.pB8, t.pT1, t.bgGray300]}>
                    <Button title="Print" onPress={this.handlePrint} />
                </TouchableOpacity>
            </View>
        );
    }
}