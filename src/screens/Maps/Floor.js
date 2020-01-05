import React from 'react';
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Image from 'react-native-scalable-image';
import { t } from 'react-native-tailwindcss';

import BackNavBar from '../../components/BackNavBar';
import ScheduleList from '../../components/ScheduleList';
import styles from '../styles';

import { scheduleByDate } from '../../utils/schedule';

import types from '../../../assets/data/types.json';
import schedule from '../../../assets/data/schedule.json';

const { width, height } = Dimensions.get('window');

export default class Floor extends React.Component {
    state = {
        isModalVisible: false,
    }

    openModal = () => {
        this.setState({ isModalVisible: true });
    }

    closeModal = () => {
        this.setState({ isModalVisible: close });
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

    renderItem({ item, index, separators }) {
        return (
            <TouchableOpacity style={[t.p1, t.flex1, t.mX2, t.border, t.borderGray400, t.rounded]}>
                <Text>Room {item.number}</Text>
            </TouchableOpacity>
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
                        <Image height={height / 3} source={{ uri: floor.floorPlan }} onPress={this.openModal} />
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
            </View>
        );
    }
}
