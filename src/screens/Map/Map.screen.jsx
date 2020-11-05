import React, {useEffect, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {MapContainer, MapMarkerInside, MapMarkerOutside} from './Map.styles';
import Geolocation from '@react-native-community/geolocation';
import {Image, StyleSheet, Text, View} from 'react-native';
import Stars from '../../components/Stars/Stars.component';

const CurrentLocationMarker = () => {
    return (
        <>
            <MapMarkerInside/>
            <MapMarkerOutside/>
        </>
    );
};

const Map = ({route}) => {
    const {lat, long, title, rating} = route.params;

    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
                setCurrentLocation({latitude: info.coords.latitude, longitude: info.coords.longitude});
            }, err => console.log(err),
            {enableHighAccuracy: true, timeout: 2000, maximumAge: 3000});
    }, []);

    return (
        <MapContainer>
            <MapView
                initialRegion={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(long),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.mapView}
            >
                <Marker coordinate={currentLocation} title='Current Location'>
                    <CurrentLocationMarker/>
                </Marker>
                <Marker coordinate={{latitude: parseFloat(lat), longitude: parseFloat(long)}}>
                    <Image style={styles.shopMarker} source={require('../../assets/img/shop-pin.png')}/>
                    <Callout>
                        <View style={styles.callout}>
                            {/*<Image source={require('../../assets/img/map-img.png')} resizeMode='cover' />*/}
                            <Text style={styles.title}>{title}</Text>
                            <Text>Rating: {rating}</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        </MapContainer>
    );
};

const styles = StyleSheet.create({
    mapView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    callout: {
        width: 100, height: 70, alignItems: 'flex-start', justifyContent: 'center',
    },
    title: {
        fontWeight: '700', fontSize: 15,
    },
    shopMarker: {
        width: 50, height: 60,
    },
});

export default Map;
