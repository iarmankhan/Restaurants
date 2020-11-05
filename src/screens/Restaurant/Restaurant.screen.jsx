import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import ImagePager from '../../components/ImagePager/ImagePager.component';
import Stars from '../../components/Stars/Stars.component';
import {Heading, MutedText, Ratings, Section, Title} from './Restaurant.styles';
import {sqliteDatabase} from '../../database/database';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {CenteredView} from '../Home/Home.styles';


const Restaurant = ({route}) => {
    const navigation = useNavigation();
    const {id} = route.params;

    const [restaurant, setRestaurant] = useState({});
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getRestaurant = async () => {
            setError(null);
            try{
                setIsLoading(true);
                const data = await sqliteDatabase.getRestaurant(id);
                setRestaurant(data);
                setIsLoading(false);
            }catch (e){
                setError(e.message)
            }
        }
        getRestaurant();
    }, [])

    if(isLoading){
        return (
            <CenteredView>
                <ActivityIndicator color='lightgreen' size='large' />
            </CenteredView>
        )
    }

    if(!isLoading && error !== null){
        return  (
            <CenteredView>
                <Text>Some errors occurred!</Text>
            </CenteredView>
        )
    }
    const images = restaurant.images ? JSON.parse(restaurant.images) : [];
    return (
        <ScrollView>
            <View style={{height: 400}}>
                <View style={{position: 'absolute', zIndex: 99999, top: 30}}>
                    <HeaderBackButton tintColor='white' onPress={() => {navigation.goBack()}} />
                </View>
                <ImagePager images={images} />
            </View>
            <View>
                <Section>
                    <Heading>{restaurant.title}</Heading>
                    <MutedText>{restaurant.phone_no}</MutedText>
                    <Ratings>
                        <Stars score={restaurant.rating}/>
                        <MutedText>(1000 reviews)</MutedText>
                    </Ratings>
                </Section>
                <Section>
                    <Title>Description</Title>
                    <MutedText>{restaurant.description}</MutedText>
                </Section>
                <Section>
                    <Title>Address</Title>
                    <MutedText>{restaurant.address}</MutedText>
                </Section>
            </View>
        </ScrollView>
    );
};

export default Restaurant;
