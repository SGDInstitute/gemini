import React from 'react';
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { t } from 'react-native-tailwindcss';

import BackNavBar from '../../components/BackNavBar';
import ScheduleList from '../../components/ScheduleList';
import styles from '../styles';

import { scheduleByDate } from '../../utils/schedule';
import { storeUserActivities, getActivities, getUserActivities } from '../../utils/api';

const { width, height } = Dimensions.get('window');

export default class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: JSON.parse(props.navigation.getParam('location', {})),
            schedule: [],
            mySchedule: [],
            refreshing: false,
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

    scheduleByLocation = location => {
        const filteredActivities = this.state.schedule.filter(activity => {
            return activity.location === location.title;
        });

        return scheduleByDate(filteredActivities, true);
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
                                source={{ uri: floor.floor_plan }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }

    renderHeader = location => {
        const locationTypeBg = location.color;
        const locationTypeText = location.text_color;

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
                    <Text style={[t.textXl, t.textWhite, t.p4, styles.transparentBg]}>{location.title}</Text>
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
        const { location, refreshing } = this.state;

        return (
            <View style={styles.flex1}>
                <BackNavBar title={location.title} back="Maps" />
                <View style={[t.flex1]}>
                    {this.renderHeader(location)}
                    {location.floors.length > 0 && this.renderFloorplans(location)}
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
            </View>
        );
    }
}
