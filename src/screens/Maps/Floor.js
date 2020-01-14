import React from 'react';
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";
import ScaledImage from 'react-native-scalable-image';
import Constants from 'expo-constants';
import { t } from 'react-native-tailwindcss';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackNavBar from '../../components/BackNavBar';
import ScheduleList from '../../components/ScheduleList';
import styles from '../styles';

import { scheduleByDate } from '../../utils/schedule';

import types from '../../../assets/data/types.json';
import schedule from '../../../assets/data/schedule.json';
import PinchableBox from '../../components/PinchableBox';

const { width, height } = Dimensions.get('window');

export default class Floor extends React.Component {
    state = {
        isModalVisible: false,
    };

    openModal = () => {
        this.setState({ isModalVisible: true });
    }

    closeModal = () => {
        this.setState({ isModalVisible: false });
    }

    scheduleByLocation = location => {
        const filteredActivities = schedule.filter(activity => {
            if (activity.location.includes('/')) {
                const splitLocation = activity.location.split('/');

                let flag = false;
                splitLocation.forEach(element => {
                    if (location.title === element) {
                        flag = true;
                    }
                });

                return flag;
            }
            return activity.location === location.title;
        });

        return scheduleByDate(filteredActivities);
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity style={[t.p1, t.flex1, t.mX2, t.border, t.borderGray400, t.rounded]}>
                <Text>Room {item.number}</Text>
            </TouchableOpacity>
        );
    }

    renderModal = () => {
        const floor = JSON.parse(this.props.navigation.getParam('floor', {}));

        return (
            <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={this.closeModal}
                onBackButtonPress={this.closeModal}
                style={{
                    marginTop: Constants.statusBarHeight,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                }}
            >
                <ImageViewer
                    imageUrls={[{ url: floor.floorPlan }]}
                    backgroundColor="transparent"
                    renderIndicator={() => null}
                />
                <TouchableOpacity onPress={this.closeModal} style={[t.absolute, t.top0, t.right0, t.m4]}>
                    <MaterialCommunityIcons name="close-circle" style={{ color: '#777' }} size={32} />
                </TouchableOpacity>
            </Modal>
        );
    }

    render() {
        const { navigation } = this.props;
        const location = JSON.parse(navigation.getParam('location', {}));
        const floor = JSON.parse(navigation.getParam('floor', {}));

        const label = `${location.title} - ${floor.level === 'B' ? 'Basement' : 'Floor ' + floor.level}`;

        return (
            <View style={styles.flex1}>
                <BackNavBar title={label} back="Maps" />
                <View style={{ height: height / 3 }}>
                    <ScrollView horizontal>
                        <ScaledImage height={height / 3} source={{ uri: floor.floorPlan }} onPress={this.openModal} />
                    </ScrollView>
                </View>
                <View style={[t.flex1]}>
                    {floor.rooms && (
                        <View>
                            <FlatList
                                style={[t.pY4]}
                                data={floor.rooms}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.number.toString()}
                                horizontal
                            />
                        </View>
                    )}
                    <View style={t.flex1}>
                        <ScheduleList style={[t.flex1]} schedule={this.scheduleByLocation(location)} />
                    </View>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}
