import React from 'react';
import { AsyncStorage, Button, KeyboardAvoidingView, ScrollView, TextInput, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';

import BackNavBar from '../components/BackNavBar';
import styles from './styles';
import { getUser, updateUser } from "../utils/api";

export default class EditSettings extends React.Component {
    state = {
        name: '',
        email: '',
        pronouns: '',
        sexuality: '',
        gender: '',
        race: '',
        college: '',
        tshirt: '',
    }

    componentDidMount = async () => {
        let user = await AsyncStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
        } else {
            user = (await getUser()).payload;
        }
        this.setState({
            name: user.name,
            email: user.email,
            pronouns: user.pronouns,
            sexuality: user.sexuality,
            gender: user.gender,
            race: user.race,
            college: user.college,
            tshirt: user.tshirt,
        });
    }

    handleSubmit = () => {
        const self = this;
        updateUser(this.state)
            .then(function (result) {
                if (result.type === 'success') {
                    self.props.navigation.navigate('Settings');
                } else {
                    Alert.alert('Whoops!', 'Looks like something went wrong. Error: ' + result.payload);
                }
            });
    }

    render() {
        return (
            <View style={styles.flex1}>
                <BackNavBar title="Edit Information" back="Settings" />
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
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Pronouns</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.pronouns}
                                onChangeText={pronouns => this.setState({ pronouns })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Sexuality</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.sexuality}
                                onChangeText={sexuality => this.setState({ sexuality })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gender</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.gender}
                                onChangeText={gender => this.setState({ gender })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Race and/or Ethnicity</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.race}
                                onChangeText={race => this.setState({ race })}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>College, University or Group</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.college}
                                onChangeText={college => this.setState({ college })}
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
        );
    }
}