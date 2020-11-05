import RESTAURANT_ACTION_TYPES from './restaurants.types';

const INITIAL_STATE = {
    restaurants: [],
    isFetching: false,
    isLoading: false,
    error: null,
    page: 0,
    endOfPage: false,
    succeed: false
};

const restaurantReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_START:
            return {
                ...state,
                isFetching: true,
                page: state.page + 1
            }
        case RESTAURANT_ACTION_TYPES.LOAD_MORE_RESTAURANT_DATA_START:
            return {
                ...state,
                isFetching: false,
                isLoading: true,
                page: state.page + 1
            };
        case RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            }
        case RESTAURANT_ACTION_TYPES.FETCH_RESTAURANT_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoading: false,
                restaurants: action.payload.data,
                endOfPage: action.payload.endOfPage,
                error: null
            };
        case RESTAURANT_ACTION_TYPES.SET_ERROR_TO_NULL:
            return {
                ...state,
                error: null
            };
        case RESTAURANT_ACTION_TYPES.SET_SUCCESS_TO_NULL:
            return {
                ...state,
                succeed: null
            };
        default:
            return state;
    }
};

export default restaurantReducer;
