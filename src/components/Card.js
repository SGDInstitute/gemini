import React from 'react';
import { StyleSheet, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default class Card extends React.PureComponent {
    render() {
        return (
            <View style={[t.mX4, t.mB4, t.roundedLg, t.bgGray200, t.border, t.borderGray400]}>
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
