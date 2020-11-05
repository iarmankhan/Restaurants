import {createSelector} from 'reselect';

const selectRestaurant = state => state.restaurant;

export const selectIsRestaurantLoading = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.isLoading
);

export const selectIsRestaurantFetching = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.isFetching
);

export const selectRestaurants = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.restaurants
);

export const selectEndOfPage = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.endOfPage
);


export const selectRestaurantError = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.error
);

export const selectRestaurantSucceed = createSelector(
    [selectRestaurant],
    (restaurant) => restaurant.succeed
);

