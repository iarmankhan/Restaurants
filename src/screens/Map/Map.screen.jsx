import React, {useEffect, useState} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import {MapContainer} from './Map.styles';
import Geolocation from '@react-native-community/geolocation';
import {Image, Text, View, PixelRatio} from 'react-native';
import Stars from '../../components/Stars/Stars.component';

const Map = ({route}) => {
    const {lat, long, title, rating} = route.params;

    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
                setCurrentLocation({latitude: info.coords.latitude, longitude: info.coords.longitude});
            }, err => console.log(err),
            {enableHighAccuracy: true, timeout: 2000, maximumAge:3000});
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
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Marker coordinate={currentLocation}>
                    <View style={{width: 30, height: 30, backgroundColor: 'lightgreen', borderRadius: 30}}>
                    </View>
                </Marker>
                <Marker coordinate={{latitude: parseFloat(lat), longitude: parseFloat(long)}}>
                    <Image style={{width: 50, height: 60}} source={require('../../assets/img/shop-pin.png')}/>
                    <Callout>
                        <View style={{width: 100, height: 70, alignItems: 'flex-start', justifyContent: 'center'}}>
                            {/*<Image source={require('../../assets/img/map-img.png')} resizeMode='cover' />*/}
                            <Text style={{fontWeight: '700', fontSize: 15}}>{title}</Text>
                            <Text>Rating: {rating}</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
        </MapContainer>
    );
};

export default Map;
