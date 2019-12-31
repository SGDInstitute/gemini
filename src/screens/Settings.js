import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { t } from 'react-native-tailwindcss';
import gravatar from 'gravatar';

import NavBar from '../components/NavBar';
import styles from "./styles";

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

    render() {
        const { name, email, pronouns, sexuality, gender, race, college, tshirt } = this.state;

        const url = gravatar.url(email, { protocol: 'https', s: '100', d: 'retro' });

        return (
            <View style={styles.flex1}>
                <NavBar title="Settings" />
                <View>
                    <View>
                        <View style={styles.p4}>
                            <View style={[t.flexRow, t.itemsCenter]}>
                                <Avatar
                                    size={70}
                                    rounded
                                    source={{
                                        uri: url,
                                    }}
                                    containerStyle={[t.mR4]}
                                />
                                <View>
                                    <Text style={[t.textXl, t.mB1]}>{name}</Text>
                                    <Text style={[t.italic]}>{pronouns}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.p4}>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>Email:</Text> {email}</Text>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>Sexuality:</Text> {sexuality}</Text>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>Gender:</Text> {gender}</Text>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>Race:</Text> {race}</Text>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>University or Group:</Text> {college}</Text>
                            <Text style={[t.mB2]}><Text style={[t.fontBold]}>T-shirt Size:</Text> {tshirt}</Text>
                        </View>
                    </View>
                    <View style={[t.flexRow, t.p4]}>
                        <TouchableOpacity style={t.flex1} onPress={() => this.props.navigation.navigate('Contact')}>
                            <Text style={styles.btn}>Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditInfo')}>
                            <Text style={styles.btn}>Edit Information</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={t.flex1} onPress={() => this.props.navigation.navigate('Logout')}>
                            <Text style={styles.btn}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}