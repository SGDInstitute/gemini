import React from 'react';
import { Button, StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { t } from 'react-native-tailwindcss';
import gravatar from 'gravatar';

import BackNavBar from '../components/BackNavBar';
import styles from './styles';

export default class Settings extends React.Component {
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

    handleNameChange = () => { }
    handleEmailChange = () => { }
    handlePronounsChange = () => { }
    handleCollegeChange = () => { }
    handleGenderChange = () => { }
    handleSexualityChange = () => { }
    handleRaceChange = () => { }

    render() {
        const { name, email, pronouns, sexuality, gender, race, college, tshirt } = this.state;

        return (
            <View style={styles.flex1}>
                <BackNavBar title="Edit" back="Settings" />
                <View>
                    <View style={styles.p4}>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Name</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleNameChange}
                                    value={name}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Email</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="email-address"
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleEmailChange}
                                    value={email}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Pronouns</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handlePronounsChange}
                                    value={pronouns}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>College, University or Group</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleCollegeChange}
                                    value={college}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Gender</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleGenderChange}
                                    value={gender}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Sexuality</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleSexualityChange}
                                    value={sexuality}
                                />
                            </View>
                        </View>
                        <View style={styles.attributeContainer}>
                            <Text style={styles.textInputTitle}>Race</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={this.handleRaceChange}
                                    value={race}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonGroup}>
                            {/* <TimerButton
                                small
                                color="#21BA45"
                                title={submitText}
                                onPress={this.handleSubmit}
                            />
                            <TimerButton
                                small
                                color="#DB2828"
                                title="Cancel"
                                onPress={onFormClose}
                            /> */}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}