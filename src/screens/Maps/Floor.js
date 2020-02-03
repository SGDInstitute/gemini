import React from 'react';
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
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
import { storeUserActivities, getActivities, getUserActivities } from '../../utils/api';

const { height } = Dimensions.get('window');

export default class Floor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: JSON.parse(props.navigation.getParam('location', {})),
            floor: JSON.parse(props.navigation.getParam('floor', {})),
            schedule: [],
            mySchedule: [],
            refreshing: false,
            isModalVisible: false
        };
    }

    componentDidMount = async () => {
        this.getMySchedule().then(() => {
            this.getSchedule();
        });
    }

    checkIfInPersonalSchedule = (id) => {
        const { mySchedule } = this.state;

        if (mySchedule) {
            const found = mySchedule.find(x => x.id === id);
            if (typeof found !== 'undefined') {
                return true;
            }
        } else {
            return false;
        }
    }

    onAdd = (id) => {
        storeUserActivities(id).then(() => {
            this.refreshMySchedule();
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });

        this.refreshSchedule().then(() => this.setState({ refreshing: false }));
    }

    getSchedule = async () => {
        const schedule = await AsyncStorage.getItem('schedule');

        if (schedule) {
            this.setState({ schedule: JSON.parse(schedule) });
        } else {
            this.refreshSchedule()
        }
    }

    getMySchedule = async () => {
        const mySchedule = await AsyncStorage.getItem('my-schedule');

        if (mySchedule) {
            this.setState({ mySchedule: JSON.parse(mySchedule) });
        } else {
            this.refreshMySchedule();
        }
    }

    refreshSchedule = async () => {
        let schedule = (await getActivities()).payload;
        this.setState({ schedule: schedule });
    }

    refreshMySchedule = async () => {
        let mySchedule = (await getUserActivities()).payload;
        this.setState({ mySchedule: mySchedule });
    }

    openModal = () => {
        this.setState({ isModalVisible: true });
    }

    closeModal = () => {
        this.setState({ isModalVisible: false });
    }

    scheduleByLocation = () => {
        const { schedule, location, floor } = this.state;

        const filteredActivities = schedule.filter(activity => {
            return activity.location_id === location.id && floor.rooms.find(r => r.number === activity.room || r.name === activity.room);
        });

        return scheduleByDate(filteredActivities, true);
    }

    renderItem({ item }) {
        return (
            <TouchableOpacity style={[t.p1, t.flex1, t.mX2, t.border, t.borderGray400, t.rounded]}>
                <Text>Room {item.number}</Text>
            </TouchableOpacity>
        );
    }

    renderModal = () => {
        const { floor, isModalVisible } = this.state;

        return (
            <Modal
                isVisible={isModalVisible}
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
                    imageUrls={[{ url: floor.floor_plan }]}
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
        const { location, floor, refreshing } = this.state;

        const label = `${location.title} - ${floor.level === 'B' ? 'Basement' : 'Floor ' + floor.level}`;

        return (
            <View style={styles.flex1}>
                <BackNavBar title={label} back="Location" data={location} />
                <View style={{ height: height / 3 }}>
                    <ScrollView horizontal>
                        <ScaledImage height={height / 3} source={{ uri: floor.floor_plan }} onPress={this.openModal} />
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
                        <ScheduleList
                            schedule={this.scheduleByLocation(location)}
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            onAdd={this.onAdd}
                            plusMinusCheck={this.checkIfInPersonalSchedule}
                        />
                    </View>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}
