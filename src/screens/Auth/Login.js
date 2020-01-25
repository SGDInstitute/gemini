import React from 'react';
import { AsyncStorage, Dimensions, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-scalable-image';

import styles from "../styles";
import { getAccessToken } from "../../utils/api";
import registerForPushNotifications from '../../utils/notifications';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    signIn = async () => {
        if (this.state.email !== '' && this.state.password !== '') {
            const response = await getAccessToken(this.state.email, this.state.password);
            if (response.type === 'success') {
                await AsyncStorage.setItem('accessToken', response.payload);
                registerForPushNotifications(response.payload);
                this.props.navigation.navigate('App');
            } else {
                this.setState({ message: response.payload });
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex1}
            >
                <ImageBackground source={require('../../../assets/midwest-map.jpg')} style={[styles.wFull, styles.hFull, styles.cover, styles.bgMint]}>
                    <View style={[styles.flex1, styles.justifyCenter]}>
                        <Image source={require('../../../assets/mblgtacc-2020-light.png')} width={Dimensions.get('window').width} />
                        <View style={[styles.p4, styles.mX4, styles.rounded, styles.transparentBg]}>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, styles.textWhite]}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.email}
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
                            </View>
                            {this.state.message !== '' && <Text style={[styles.p4, styles.textWhite]}>{this.state.message}</Text>}
                            <TouchableOpacity style={styles.pX8} onPress={this.signIn}>
                                <Text style={styles.btnYellow}>Sign In!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}