import React from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { NavigationEvents } from 'react-navigation';

import { getUser } from "../utils/api";

import NavBar from '../components/NavBar';
import styles from "./styles";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount = async () => {
        this.getUser();
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

    signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    renderLoading() {
        return <View style={[styles.container, styles.flex1]}><Text>Loading...</Text></View >;
    }

    renderUser() {
        const { user } = this.state;

        return (
            <View>
                <NavigationEvents
                    onWillFocus={payload => this.getUser()}
                />
                <View>
                    <View style={styles.p4}>
                        <View style={[t.flexRow, t.itemsCenter]}>
                            <View>
                                <Text style={[t.textXl, t.mB1]}>{user.name}</Text>
                                <Text style={[t.italic]}>{user.pronouns}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.p4}>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>Email:</Text> {user.email}</Text>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>Sexuality:</Text> {user.sexuality}</Text>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>Gender:</Text> {user.gender}</Text>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>Race:</Text> {user.race}</Text>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>University or Group:</Text> {user.college}</Text>
                        <Text style={[t.mB2]}><Text style={[t.fontBold]}>T-shirt Size:</Text> {user.tshirt}</Text>
                    </View>
                </View>
                <View style={[t.flexRow, t.p4, t._mX2]}>
                    <TouchableOpacity style={t.flex1} onPress={() => this.props.navigation.navigate('Contact')}>
                        <Text style={[styles.btn, t.mX2]}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditSettings')}>
                        <Text style={[styles.btn, t.mX2]}>Edit Information</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={t.flex1} onPress={this.signOut}>
                        <Text style={[styles.btn, t.mX2]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Settings" />
                {this.state.user === null ? this.renderLoading() : this.renderUser()}
            </View>
        );
    }
}