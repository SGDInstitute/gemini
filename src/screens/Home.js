import React from 'react';
import { Button, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar';
import ImageCard from '../components/ImageCard';
import Card from '../components/Card';

import styles from "./styles";

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.flex1}>
                <NavBar title="Home" />
                <ScrollView>
                    <ImageCard image="https://mblgtacc.org/assets/2020/sangren-hall-sm.jpg">
                        <Text>Welcome to MBLGTACC 2020! Thank you for joining us here at Western Michigan University.</Text>
                        <View style={[t.mT4, t.flexRow]}>
                            <TouchableOpacity style={[t.flex1, t.mR2]}>
                                <Text style={styles.btn} onPress={() => this.props.navigation.navigate('Schedule')}>View Schedule</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[t.flex1]}>
                                <Text style={styles.btn} onPress={() => alert('Navigate to Check-in Page - TODO')}>Check In</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageCard>
                    <Card>
                        <Text>Get to know your way around Western Michigan and MBLGTACC.</Text>
                        <View style={[t.mT4, t.flexRow]}>
                            <TouchableOpacity style={[t.flex1]}>
                                <Text style={styles.btn} onPress={() => this.props.navigation.navigate('Maps')}>View Maps</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}