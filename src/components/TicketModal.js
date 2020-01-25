import React from 'react';
import { Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "../screens/styles";
import { updateTicket } from "../utils/api";

export default class TicketModal extends React.PureComponent {
    constructor(props) {
        super(props);

        const { user } = props.ticket;

        if (user !== null) {
            this.state = {
                name: user.name,
                email: user.email,
                pronouns: user.pronouns,
                sexuality: user.sexuality,
                gender: user.gender,
                race: user.race,
                college: user.college,
            };
        } else {
            this.state = {
                name: '',
                email: '',
                pronouns: '',
                sexuality: '',
                gender: '',
                race: '',
                college: '',
            };
        }
    }

    handleSubmit = () => {
        const { ticket, onSave, onClose } = this.props;

        updateTicket(ticket.hash, this.state)
            .then((result) => {
                if (result.type === 'success') {
                    onClose();
                    onSave();
                } else {
                    alert('Whoops looks like there was an issue. Please try again later. Error: ' + payload.message);
                }
            });
    }

    render() {
        const { onClose } = this.props;

        return (
            <View style={[t.flex1, t.bgWhite, t.roundedLg, t.overflowHidden]}>
                <View style={{
                    backgroundColor: '#009999',
                    height: 75,
                    padding: 15,
                    justifyContent: 'flex-end',
                }}>
                    <TouchableOpacity onPress={onClose} style={[t.absolute, t.top0, t.right0, t.m4]}>
                        <MaterialCommunityIcons name="close-circle" size={32} />
                    </TouchableOpacity>
                    <Text style={[t.textWhite, t.textXl]}>Edit Ticket Details</Text>
                </View>
                <View style={t.flex1}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.flex1}
                    >
                        <ScrollView>
                            <View style={[styles.inputGroup, styles.pT8]}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.name}
                                    onChangeText={name => this.setState({ name })}
                                    placeholder="Harry Potter"
                                />
                            </View>
                            <View style={[styles.inputGroup]}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.email}
                                    onChangeText={email => this.setState({ email })}
                                    placeholder="hpotter@hogwarts.edu"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Pronouns</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.pronouns}
                                    onChangeText={pronouns => this.setState({ pronouns })}
                                    placeholder="He/They"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Sexuality</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.sexuality}
                                    onChangeText={sexuality => this.setState({ sexuality })}
                                    placeholder="Queer"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Gender</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.gender}
                                    onChangeText={gender => this.setState({ gender })}
                                    placeholder="Queer"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Race</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.race}
                                    onChangeText={race => this.setState({ race })}
                                    placeholder="Queer"
                                />
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>College, University or Group</Text>
                                <TextInput
                                    style={styles.input}
                                    value={this.state.college}
                                    onChangeText={college => this.setState({ college })}
                                    placeholder="Hogwarts"
                                />
                            </View>
                            <View>
                                <TouchableOpacity >
                                    <Button title="Save Changes" onPress={this.handleSubmit} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}