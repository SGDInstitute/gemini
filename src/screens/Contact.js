import React from 'react';
import { AsyncStorage, Button, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import Faq from '../components/Faq';

import { getContent, getUser, storeTicket } from '../utils/api';
import styles from "./styles";

export default class Contact extends React.Component {
    state = {
        faq: [],
        user: [],
        form: {
            subject: '',
            message: '',
        },
        errors: [],
        showSuccess: false,
    }

    componentDidMount = async () => {
        this.getFAQ();
        this.getUser();
    }

    getFAQ = async () => {
        const faq = await AsyncStorage.getItem('faq');

        if (faq) {
            this.setState({ faq: JSON.parse(faq) });
        } else {
            let faq = (await getContent('faq')).payload;
            this.setState({ faq: faq });
        }
    }

    getUser = async () => {
        let user = await AsyncStorage.getItem('user');

        if (user) {
            this.setState({ user: JSON.parse(user) });
        } else {
            let user = (await getUser('user')).payload;
            this.setState({ user: user });
        }
    }

    handleSubmit = async () => {
        let { form } = this.state;
        this.setState({ errors: [] });
        let errors = [];

        if (form.subject !== '' && form.message !== '') {
            let result = await storeTicket(form);
            if (result.type === 'success') {
                this.setState({ form: { subject: '', message: '' }, showSuccess: true });
            } else {
                errors.push(result.payload);
                this.setState({ errors: errors });
            }
        } else {
            if (form.subject === '') {
                errors.push('Subject is required');
            }
            if (form.message === '') {
                errors.push('Message is required');
            }
            this.setState({ errors: errors });
        }
    }

    setForm = (key, value) => {
        let form = { ...this.state.form };
        form[key] = value;
        this.setState({ form });
    }

    renderErrors() {
        const { errors } = this.state;

        return (
            <View style={[t.bgRed100, t.border, t.borderRed400, t.rounded, t.p4, t.mX4, t.mB8]}>
                {
                    errors.map((error) => (
                        <Text key={error} >{error}</Text>
                    ))
                }
            </View>
        );
    }

    renderFAQ() {
        return this.state.faq.map((faq) => (
            <Faq key={faq.id} faq={faq} />
        ));
    }

    render() {
        const { name, pronouns, email } = this.state.user;
        const { errors, showSuccess, form } = this.state;

        return (
            <View style={styles.flex1}>
                <NavBar title="Contact" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.flex1}
                >
                    <ScrollView>
                        <View style={t.p4}>
                            <View style={t.mB4}>
                                <Text style={[t.textLg, t.mB2]}>FAQ</Text>
                                {this.renderFAQ()}
                            </View>
                            <View>
                                <Text style={[t.textLg, t.mB2]}>Contact Us</Text>
                                <View style={[t._mX2]}>
                                    <Text style={[t.pX4, t.mB1]}><Text style={[t.fontBold]}>Name:</Text> {name}</Text>
                                    <Text style={[t.pX4, t.mB1]}><Text style={[t.fontBold]}>Pronouns:</Text> {pronouns}</Text>
                                    <Text style={[t.pX4, t.mB2]}><Text style={[t.fontBold]}>Email:</Text> {email}</Text>

                                    <View style={[styles.inputGroup, t.pB2]}>
                                        <Text style={styles.label}>Subject</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={form.subject}
                                            onChangeText={subject => this.setForm('subject', subject)}
                                        />
                                    </View>

                                    <View style={[styles.inputGroup, t.pB2]}>
                                        <Text style={styles.label}>Message</Text>
                                        <TextInput
                                            multiline
                                            style={styles.textarea}
                                            value={form.message}
                                            onChangeText={message => this.setForm('message', message)}
                                        />
                                    </View>
                                    {errors.length > 0 && this.renderErrors()}
                                    {showSuccess &&
                                        <Text style={[t.bgGreen100, t.border, t.borderGreen400, t.rounded, t.p4, t.mX4, t.mB8]}>
                                            You have successfully sent us an email. We will respond as soon as possible!
                                    </Text>}
                                    <View>
                                        <TouchableOpacity >
                                            <Button title="Send Us A Message" onPress={this.handleSubmit} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}