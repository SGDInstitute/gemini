import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { t } from 'react-native-tailwindcss';

import NavBar from '../components/NavBar'
import BuildingMarker from '../components/Maps/BuildingMarker';
import BuildingCallout from '../components/Maps/BuildingCallout';
import Location from '../components/Maps/Location';

import markers from '../../assets/data/locations.json';
import mapStyle from '../../assets/data/mapstyle.json';

const { width, height } = Dimensions.get('window');

export default class Maps extends React.Component {
    state = {
        openMarker: null
    }

    handleCenterPress = (marker) => {
        this.map.animateCamera({
            center: marker.latlng
        });
    }

    handleFitAll = () => {
        this.map.fitToCoordinates(markers.map((marker) => {
            return marker.latlng;
        }), {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        })
    }

    handleFitConference = () => {
        this.map.fitToCoordinates(
            markers.filter((marker) => {
                return marker.type === 'conference';
            }).map((marker) => {
                return marker.latlng;
            }), {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
        });
    }

    handleMarkerPress = (id) => {
        this.setState({ openMarker: id });
    }

    renderMarkers = () => {
        return markers.map(marker => (
            <Marker
                key={marker.id}
                coordinate={marker.latlng}
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
                        <ScrollView>
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
    },
    map: {
        position: 'absolute',
        top: 80,
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
        height: 32,
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
        height: 32,
        marginRight: 8
    }
});