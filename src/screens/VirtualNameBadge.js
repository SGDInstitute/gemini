import React from 'react';
import { AsyncStorage, Dimensions, Text, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import { getUser } from "../utils/api";

export default class VirtualNameBadge extends React.PureComponent {
    state = {
        user: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getUser();
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

    render() {
        const { user } = this.state;
        return (
            <View style={[t.flex1]}>
                <NavBar title="Name Badge" />
                <View style={[t.flex1, t.mT12]}>
                    <Image
                        width={Dimensions.get('window').width}
                        source={require('../../assets/name-badge-background.png')}
                    />
                    <Text style={[t.text2Xl, t.textCenter, t.mT8, t.fontBold]}>{user.name}</Text>
                    <Text style={[t.textXl, t.textCenter, t.mB4, t.mT2]}>{user.pronouns}</Text>
                    <Text style={[t.textCenter, t.textXl]}>{user.college}</Text>
                </View>
            </View>
        );
    }
}