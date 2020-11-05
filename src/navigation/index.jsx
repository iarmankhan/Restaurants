import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {StatusBar} from 'react-native';

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
            <MainStack />
        </NavigationContainer>
    )
}
export default RootNavigator;
