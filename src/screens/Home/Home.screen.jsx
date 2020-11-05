import React, {useEffect} from 'react';
import ListItem from '../../components/ListItem/ListItem.component';
import {CenteredView, HomeContainer} from './Home.styles';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchRestaurantDataStartAsync} from '../../redux/restaurant/restaurant.actions';
import {
    selectEndOfPage,
    selectIsRestaurantFetching,
    selectIsRestaurantLoading, selectRestaurantError,
    selectRestaurants, selectRestaurantSucceed,
} from '../../redux/restaurant/restaurant.selectors';
import {ActivityIndicator, Button, FlatList, Text, View} from 'react-native';

const Home = ({fetchRestaurants, restaurants, isFetching, error, isLoading, endOfPage}) => {
    useEffect(() => {
        if(!isLoading){
            fetchRestaurants().then();
        }
    }, []);

    const startFetchingRestaurants = async () => {
        try {
            await fetchRestaurants();
        } catch (e) {
            console.log(e)
        }
    };

    const handleLoadMore = () => {
        if (!isLoading && !endOfPage) {
            startFetchingRestaurants().then();
        }
    };

    if (isFetching) {
        return (
            <CenteredView>
                <ActivityIndicator color='lightgreen' size='large'/>
            </CenteredView>
        );
    }

    if (!isFetching && error) {
        return (
            <CenteredView>
                <Text>Some errors occurred!</Text>
                <Button title='Try again!' onPress={startFetchingRestaurants} />
            </CenteredView>
        );
    }

    return (
        <HomeContainer>
            <FlatList
                data={restaurants}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return <ListItem id={item.id} title={item.title} rating={item.rating} lat={item.lat}
                                     long={item.long}/>;
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.01}
                initialNumToRender={8}
            />
        </HomeContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    restaurants: selectRestaurants,
    isFetching: selectIsRestaurantFetching,
    isLoading: selectIsRestaurantLoading,
    succeed: selectRestaurantSucceed,
    error: selectRestaurantError,
    endOfPage: selectEndOfPage,
});

const mapDispatchToProps = dispatch => ({
    fetchRestaurants: () => dispatch(fetchRestaurantDataStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
