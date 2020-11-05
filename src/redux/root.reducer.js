import {combineReducers} from 'redux';
import restaurantReducer from './restaurant/restaurant.reducers';


const rootReducer = combineReducers({
    restaurant: restaurantReducer
});

export default rootReducer;
