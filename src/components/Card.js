import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default class Card extends React.Component {
    render() {
        return (
            <View style={[t.m4, t.roundedLg, t.overflowHidden, t.bgGray200, t.border, t.borderGray400]}>
                <View style={[t.p4]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
});
