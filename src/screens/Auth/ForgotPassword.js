import React from 'react';
import { AsyncStorage, ScrollView, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { t } from 'react-native-tailwindcss';

import styles from "../styles";
import { passwordReset } from "../../utils/api";
import registerForPushNotifications from '../../utils/notifications';

export default class Register extends React.Component {
    state = {
        email: '',
        message: '',
        errors: [],
    }

    sendLink = async () => {
        if (this.state.email === '') {
            Alert.alert('Ope!', 'Your email is required.');
        } else {
            const response = await passwordReset(this.state);
            if (response.type === 'success') {
                Alert.alert('We have sent you a password reset email. Please follow instructions in the email and come back to the app when you are ready to login.');
                this.props.navigation.navigate('Login');
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
                            <Text style={[t.textXl, t.textWhite, t.mB4, t.pX4]}>Reset Password</Text>

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

                            {
                                this.state.errors.length > 0 && this.renderErrors()
                            }

                            <TouchableOpacity style={styles.pX8} onPress={this.sendLink}>
                                <Text style={styles.btnYellow}>Send Reset Link</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.pX8, t.mT8]} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={[t.textWhite, t.textLg, t.textCenter]}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.pX8, t.mT8]} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={[t.textWhite, t.textLg, t.textCenter]}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}