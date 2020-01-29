import React from 'react';
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { t } from 'react-native-tailwindcss';

import BackNavBar from '../../components/BackNavBar';
import ScheduleList from '../../components/ScheduleList';
import styles from '../styles';

import { scheduleByDate } from '../../utils/schedule';

const { width, height } = Dimensions.get('window');

export default class Location extends React.Component {
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

    renderFloorplans = location => {
        return (
            <View style={[t.p4, t.flexRow, t._mX2]}>
                {location.floors.map(floor => {
                    return (
                        <TouchableOpacity
                            key={floor.level}
                            style={[t.p1, t.flex1, t.mX2, t.border, t.borderGray400, t.rounded]}
                            onPress={() => this.props.navigation.navigate('Floor', {
                                location: JSON.stringify(location),
                                floor: JSON.stringify(floor),
                            })}
                        >
                            <Text style={[t.textGray600, t.textCenter]}>{floor.level === 'B' ? 'Basement' : 'Floor ' + floor.level}</Text>
                            <Image
                                style={{ width: '100%', height: 50 }}
                                source={{ uri: floor.floorPlan }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }

    renderHeader = location => {
        const locationTypeBg = types[location.type].bgColor;
        const locationTypeText = types[location.type].textColor;

        if (location.background) {
            return (
                <ImageBackground source={{ uri: location.background }}
                    style={{
                        width: '100%',
                        height: 150,
                        justifyContent: 'flex-end',
                        resizeMode: 'cover'
                    }}
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <Text style={[t.textXl, t[locationTypeText], t.p4, styles.transparentBg]}>{location.title}</Text>
                </ImageBackground >
            );
        }

        return (
            <View style={{
                backgroundColor: locationTypeBg,
                height: 150,
                padding: 15,
                justifyContent: 'flex-end',
            }}>
                <Text style={[t.textXl, t[locationTypeText]]}>{location.title}</Text>
            </View >
        )
    }

    render() {
        const { navigation } = this.props;
        const location = JSON.parse(navigation.getParam('location', {}));

        return (
            <View style={styles.flex1}>
                <BackNavBar title={location.title} back="Maps" />
                <View style={[t.flex1]}>
                    {this.renderHeader(location)}
                    {location.floors && this.renderFloorplans(location)}
                    <View style={t.flex1}>
                        <ScheduleList style={[t.flex1]} schedule={this.scheduleByLocation(location)} />
                    </View>
                </View>
            </View>
        );
    }
}
