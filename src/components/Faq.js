import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-simple-markdown'
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Faq extends React.Component {
    state = {
        isVisible: false,
    }

    handlePress = () => {
        this.setState({ isVisible: !this.state.isVisible });
    }

    render() {
        const { title, content } = this.props.faq;

        let plusMinusButton;
        if (this.state.isVisible) {
            plusMinusButton = <TouchableOpacity onPress={this.handlePress}><MaterialCommunityIcons name="minus-circle-outline" size={20} /></TouchableOpacity>;
        } else {
            plusMinusButton = <TouchableOpacity onPress={this.handlePress}><MaterialCommunityIcons name="plus-circle-outline" size={20} /></TouchableOpacity>;
        }

        return (
            <View style={[t.border, t.borderGray400, t.rounded, t.overflowHidden, t.mB1]}>
                <View style={[t.bgGray100, t.p2, t.flexRow, t.justifyBetween, t.itemsCenter]}>
                    <Text onPress={this.handlePress}>{title}</Text>
                    {plusMinusButton}
                </View>
                {this.state.isVisible === true &&
                    <View style={[t.borderT, t.borderGray400, t.p2]}>
                        <Markdown styles={markdownStyles}>{content}</Markdown>
                    </View>
                }
            </View>
        );
    }
}

const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: '#009999',
    },
    link: {
        color: '#009999',
    },
    mailTo: {
        color: '#009999',
    },
    text: {
        lineHeight: 20
    }
}