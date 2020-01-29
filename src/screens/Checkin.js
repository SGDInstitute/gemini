import React from 'react';
import { AsyncStorage, Button, ScrollView, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import Ticket from '../components/Ticket';

import { getOrders, storeTicketsInQueue } from '../utils/api';
import styles from "./styles";

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
            this.refreshOrders();
        } else {
            alert('Whoops looks like there was an issue. Please try again later. Error: ' + response.payload.message);
        }
    }

    refreshOrders = async () => {
        this.setState({ refreshing: true });
        let orders = (await getOrders('orders')).payload;
        this.setState({ orders: orders });
        this.setState({ refreshing: false });
    }

    renderTickets(tickets) {
        return tickets.map((ticket) => {
            const isChecked = this.state.print.includes(ticket.id);
            return <Ticket key={ticket.id} onCheck={this.handleCheck} onSave={this.refreshOrders} ticket={ticket} isChecked={isChecked} />
        });
    }

    renderOrders() {
        const { orders } = this.state;
        if (orders.length > 0) {
            return orders.map((order) => (
                <View key={order.id} style={[t.mB4]}>
                    <Text style={[t.pX4, t.textXl, t.mB4]}>Order: #{order.id}</Text>
                    {this.renderTickets(order.tickets)}
                </View>
            ));
        } else {
            return <Text>Loading...</Text>;
        }
    }

    render() {
        const { refreshing } = this.state;

        return (
            <View style={styles.flex1}>
                <NavBar title="Check In" />
                <ScrollView
                    style={[t.pT4]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.refreshOrders} />
                    }
                >
                    {this.renderOrders()}

                    <TouchableOpacity style={[t.pB16]}>
                        <Button title="Print" onPress={this.handlePrint} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}