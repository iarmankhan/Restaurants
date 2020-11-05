import RESTAURANT_ACTION_TYPES from './restaurants.types';
import {sqliteDatabase} from '../../database/database';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchRestaurantDataStart = () => ({
    type: RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_START,
});

export const loadMoreRestaurantDataStart = () => ({
    type: RESTAURANT_ACTION_TYPES.LOAD_MORE_RESTAURANT_DATA_START,
});

export const fetchRestaurantDataStartAsync = () => {
    return async (dispatch, getState) => {

        // Get current user from state
        const {restaurant: {page, restaurants}} = getState();

        page === 0 ? dispatch(fetchRestaurantDataStart()) : dispatch(loadMoreRestaurantDataStart());

        try {
            const {count} = await sqliteDatabase.getCount();
            const firstSetup = await AsyncStorage.getItem('firstSetup');
            if (firstSetup === null || count === 0 ) {
                const response = await fetch('http://192.249.121.94/~mobile/interview/public/api/restaurants_list');
                const {data} = await response.json();
                await sqliteDatabase.addRestaurants(data);

                await AsyncStorage.setItem('firstSetup', 'done');
            }

            const offset = page * 8;
            const newRestaurants = await sqliteDatabase.getAllRestaurants(offset);

            let results = page === 0 ? newRestaurants : [...restaurants, ...newRestaurants];
            dispatch(fetchRestaurantDataSuccess({data: results, endOfPage: newRestaurants.length === 0}));

        } catch (e) {
            dispatch(fetchRestaurantDataFailure(e));
        }
    };
};

export const fetchRestaurantDataSuccess = (restaurants) => ({
    type: RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_SUCCESS,
    payload: restaurants,
});

export const fetchRestaurantDataFailure = (error) => ({
    type: RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_FAILURE,
    payload: error,
});
