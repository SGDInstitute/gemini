import React from 'react';
import { AsyncStorage, ScrollView, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';

import styles from "../styles";
import { storeUser } from "../../utils/api";
import registerForPushNotifications from '../../utils/notifications';

export default class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        message: '',
        errors: [],
    }

    register = async () => {
        if (this.state.name === '') {
            Alert.alert('Ope!', 'Your name is required.');
        } else if (this.state.email === '') {
            Alert.alert('Ope!', 'Your email is required.');
        } else if (this.state.password === '') {
            Alert.alert('Ope!', 'You need a password.');
        } else if (this.state.password.length < 8) {
            Alert.alert('Ope!', 'Your password must be 8 or more characters.');
        } else if (this.state.password_confirmation === '') {
            Alert.alert('Ope!', 'You need to confirm your password.');
        } else if (this.state.password !== this.state.password_confirmation) {
            Alert.alert('Ope!', 'Your confirm password does not match the password.');
        } else {
            const response = await storeUser(this.state);
            if (response.type === 'success') {
                await AsyncStorage.setItem('accessToken', response.payload);
                registerForPushNotifications(response.payload);
                this.props.navigation.navigate('App');
            } else {
                this.setState({ message: response.payload, errors: response.errors });
            }
        }
    }

    renderErrors() {
        const { errors } = this.state;

        return (
            <View style={[t.bgRed500, t.rounded, t.p2, t.mX4, t.mB8]}>
                {
                    errors.map((error) => (
                        <Text style={[t.textWhite, t.mB2]} key={error} >{error}</Text>
                    ))
                }
            </View>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[styles.flex1]}
            >
                <ImageBackground source={require('../../../assets/midwest-map.jpg')} style={[styles.wFull, styles.hFull, styles.cover, styles.bgMint]}>
                    <ScrollView contentContainerStyle={[styles.flex1, t.pT12, t.mB12]}>
                        <View style={[styles.p4, styles.mX4, styles.rounded, styles.transparentBg]}>
                            <Text style={[t.textXl, t.textWhite, t.mB4, t.pX4]}>Create an Account</Text>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, styles.textWhite]}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                    placeholder="Full Name"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, styles.textWhite]}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.email}
                                    autoCompleteType="email"
                                    autoCapitalize="none"
                                    onChangeText={email => this.setState({ email })}
                                    placeholder="Email"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, styles.textWhite]}>Password</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={styles.input}
                                    value={this.state.password}
                                    onChangeText={password => this.setState({ password })}
                                    autoCompleteType="password"
                                    placeholder="Password"
                                />
                                <Text style={[t.textSm, t.italic, t.textWhite]}>Your password must be at least 8 characters in length, with at least 3 of the following: upper case letter, lower case letter, number, or special character.</Text>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, styles.textWhite]}>Confirm Password</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    style={styles.input}
                                    value={this.state.password_confirmation}
                                    onChangeText={password_confirmation => this.setState({ password_confirmation })}
                                    autoCompleteType="password"
                                    placeholder="Confirm Password"
                                />
                            </View>

                            {
                                this.state.errors.length > 0 && this.state.message !== '' ?
                                    this.renderErrors() :
                                    <Text style={[styles.p4, styles.textWhite]}>{this.state.message}</Text>
                            }

                            <TouchableOpacity style={styles.pX8} onPress={this.register}>
                                <Text style={styles.btnYellow}>Create Account</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.pX8, t.mT8]} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={[t.textWhite, t.textLg, t.textCenter]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}