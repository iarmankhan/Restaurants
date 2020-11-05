import React from 'react';
import {Image, View} from 'react-native';
import {
    ImageContainer,
    ListItemContainer,
    MapIcon,
    RestaurantDetails,
    RestaurantName
} from './ListItem.styles';
import Stars from '../Stars/Stars.component';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({title, rating, id, lat, long}) => {
    const navigation = useNavigation();
    return (
        <ListItemContainer onPress={() => navigation.navigate('Restaurant', {id})} activeOpacity={0.6}>
            <ImageContainer>
                <Image source={require('../../assets/img/img.png')}
                       style={{borderRadius: 8, width: '100%', height: '100%'}}/>
            </ImageContainer>
            <RestaurantDetails>
                <RestaurantName>{title}</RestaurantName>
                <View style={{marginLeft: 0}}>
                    <Stars score={rating}/>
                </View>
            </RestaurantDetails>
            <MapIcon onPress={() => navigation.navigate('Map', {id, lat, long, title, rating})} activeOpacity={0.6}>
                <Image source={require('../../assets/img/map.png')} resizeMode='contain' style={{flex: 1}}/>
            </MapIcon>
        </ListItemContainer>
    );
};

export default ListItem;
