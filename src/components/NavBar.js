import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';

const CustomHeader = props => (
    <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => props.navigation.openDrawer(), }}
        centerComponent={{ text: props.title, style: { color: '#fff', fontSize: 20, fontWeight: "700" } }}
        rightComponent={{ icon: 'settings', color: '#fff' }}
        containerStyle={{
            backgroundColor: '#009999',
        }}
    />
);

export default CustomHeader;


const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

const styles = StyleSheet.create({
    container: {
        // height: 80,
        // flex: 1,
        // flexDirection: 'row',
        paddingTop: statusHeight + 20,
        color: '#fff',
        backgroundColor: '#009999',
    }
});