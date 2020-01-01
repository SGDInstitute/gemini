import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import NavBar from '../components/NavBar'
import BuildingMarker from '../components/Maps/BuildingMarker';
import BuildingCallout from '../components/Maps/BuildingCallout';

import markers from '../../assets/data/locations.json';

export default class Maps extends React.Component {
    renderMarkers = () => {
        return markers.map(marker => (
            <Marker
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                calloutOffset={{ x: 0, y: 33 }}
                calloutAnchor={{ x: 0, y: 0 }}
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
            <View>
                <NavBar title="Maps" />
                <MapView
                    initialRegion={{
                        "latitude": 42.28173741591952,
                        "latitudeDelta": 0.0100883020294944,
                        "longitude": -85.6138107423251,
                        "longitudeDelta": 0.006572470806446518,
                    }}
                    style={styles.mapStyle}
                    onRegionChange={this.onRegionChange}
                    showsIndoors
                    showsIndoorLevelPicker
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