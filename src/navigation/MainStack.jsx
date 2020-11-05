import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/Home.screen';
import Restaurant from '../screens/Restaurant/Restaurant.screen';
import Map from '../screens/Map/Map.screen';

const MainStack = () => {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerStyle: {
            backgroundColor: 'lightgreen'
        },
        headerTitleStyle: {
            color: 'white'
        },
        headerTintColor: 'white'
    };
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" options={{title: 'Restaurants List'}} component={Home}/>
            <Stack.Screen name="Restaurant" options={{headerShown: false}} component={Restaurant}/>
            <Stack.Screen name="Map" component={Map}/>
        </Stack.Navigator>
    );
};

export default MainStack;
