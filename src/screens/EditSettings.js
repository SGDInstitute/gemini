import React from 'react';
import { Button, TextInput, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackNavBar from '../components/BackNavBar';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class EditSettings extends React.Component {
    state = {
        name: 'Andy Swick',
        email: 'andymswick@gmail.com',
        pronouns: 'They/Them',
        sexuality: 'Lesbian',
        gender: 'Non-binary',
        race: 'white',
        college: 'Midwest Institute for Sexuality and Gender Diversity',
        tshirt: 'M',
    }

    handleSubmit = () => { }

    render() {
        return (
            <View style={styles.flex1}>
                <BackNavBar title="Edit Information" back="Settings" />
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={[styles.flex1, styles.p4]}
                    scrollEnabled={true}
                >
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={name => this.setState({ name })}
                            placeholder="Harry Potter"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                            placeholder="email@example.com"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
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
                            placeholder="Queer"
                        />
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Button title="Save Changes" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}