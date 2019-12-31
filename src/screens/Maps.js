import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import NavBar from '../components/NavBar'

import markers from '../../assets/data/locations.json';

export default class Maps extends React.Component {
    onRegionChange = () => { }

    renderMarkers = () => {
        return markers.map(marker => (
            <Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
            />
        ));
    }

    render() {
        return (
            <View>
                <NavBar title="Maps" />
                <MapView
                    initialRegion={{
                        latitude: 42.384190,
                        longitude: -85.614535,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.009,
                    }}
                    style={styles.mapStyle}
                >
                    {this.renderMarkers()}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});