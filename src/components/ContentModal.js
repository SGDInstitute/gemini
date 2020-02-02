import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { ListItem } from 'react-native-elements'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Constants from 'expo-constants';

export default class ContentModal extends React.PureComponent {
    state = {
        isModalVisible: false,
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    renderModal() {
        return (
            <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={this.toggleModal}
                onBackButtonPress={this.toggleModal}
                style={{
                    marginTop: Constants.statusBarHeight,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                }}
            >
                <View style={[t.flex1, t.bgWhite, t.roundedLg, t.overflowHidden]}>
                    <View style={{
                        backgroundColor: '#009999',
                        height: 75,
                        padding: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: '#ffffff', fontSize: 24 }}>{this.props.title}</Text>
                        <TouchableOpacity onPress={this.toggleModal}>
                            <MaterialCommunityIcons name="close-circle" size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={t.flex1}>
                        <ScrollView style={[t.p4]}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View>
                <ListItem
                    title={this.props.title}
                    leftIcon={<MaterialCommunityIcons name={this.props.icon} size={28} />}
                    onPress={this.toggleModal}
                    bottomDivider
                    chevron
                />
                {this.renderModal()}
            </View>
        );
    }
}
