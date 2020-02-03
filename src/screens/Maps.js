import React from 'react';
import { StyleSheet, ScrollView, Text, RefreshControl, AsyncStorage, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { t } from 'react-native-tailwindcss';
import Constants from 'expo-constants';

import NavBar from '../components/NavBar'
import BuildingMarker from '../components/Maps/BuildingMarker';
import BuildingCallout from '../components/Maps/BuildingCallout';
import Location from '../components/Maps/Location';

import { getLocations } from '../utils/api';
import mapStyle from '../../assets/data/mapstyle.json';

const { height } = Dimensions.get('window');

export default class Maps extends React.Component {
    state = {
        openMarker: null,
        markers: [],
        refreshing: false,
    }

    componentDidMount = async () => {
        this.getLocations();
    }

    onRefresh = async () => {
        this.setState({ refreshing: true });
        this.refreshLocations().then(() => this.setState({ refreshing: false }));
    }

    getLocations = async () => {
        const markers = await AsyncStorage.getItem('locations');

        if (markers) {
            this.setState({ markers: JSON.parse(markers) });
        } else {
            this.refreshLocations()
        }
    }

    handleCenterPress = (marker) => {
        this.map.animateCamera({
            center: marker.coordinates
        });
    }

    handleFitAll = () => {
        const { markers } = this.state;

        this.map.fitToCoordinates(markers.map((marker) => {
            return marker.coordinates;
        }), {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }

    handleFitConference = () => {
        const { markers } = this.state;

        this.map.fitToCoordinates(
            markers.filter((marker) => {
                return marker.type === 'conference';
            }).map((marker) => {
                return marker.coordinates;
            }), {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }

    handleMarkerPress = (id) => {
        this.setState({ openMarker: id });
    }

    refreshLocations = async () => {
        let markers = (await getLocations()).payload;
        this.setState({ markers: markers });
    }

    renderMarkers = () => {
        return this.state.markers.map(marker => (
            <Marker
                key={marker.id}
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.description}
                calloutOffset={{ x: 0, y: 33 }}
                calloutAnchor={{ x: 0, y: 0 }}
                onPress={() => this.props.navigation.navigate('Location', {
                    location: JSON.stringify(marker),
                })}
            >
                <BuildingMarker title={marker.title} />
                <Callout tooltip={true}>
                    <BuildingCallout {...marker} />
                </Callout>
            </Marker>
        ));
    }

    render() {
        const { markers, refreshing } = this.state;

        return (
            <View style={styles.flex1}>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}
                        ref={ref => {
                            this.map = ref;
                        }}
                        initialRegion={{
                            "latitude": 42.28173741591952,
                            "latitudeDelta": 0.0100883020294944,
                            "longitude": -85.6138107423251,
                            "longitudeDelta": 0.006572470806446518,
                        }}
                        style={styles.map}
                    >
                        {this.renderMarkers()}
                    </MapView>
                    <View style={styles.eventList}>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={t.flex1} onPress={this.handleFitConference}>
                                <Text style={styles.btn}>Fit Campus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={t.flex1} onPress={this.handleFitAll}>
                                <Text style={styles.btn}>Fit All Locations</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
                            }
                        >
                            {markers.map(marker => (
                                <Location key={marker.id} navigation={this.props.navigation} location={marker} onCenterPress={this.handleCenterPress} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <NavBar title="Maps" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    eventList: {
        position: 'absolute',
        top: height / 2,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff'
    },
    map: {
        position: 'absolute',
        top: Constants.statusBarHeight,
        left: 0,
        right: 0,
        bottom: height / 2,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -8,
        padding: 15
    },
    btn: {
        backgroundColor: '#009999',
        borderRadius: 6,
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        marginHorizontal: 8
    },
    btnSecondary: {
        backgroundColor: '#aeb3bf',
        borderRadius: 6,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 8,
        textAlign: 'center',
        marginRight: 8
    }
});