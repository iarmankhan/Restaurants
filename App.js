import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import RootNavigator from './src/navigation/index';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
    useEffect(() => {
        const init = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Restaurant app location permission',
                        message:
                            'Restaurant app need to access your location ' +
                            'so you can use map.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Permission Granted');
                } else {
                    console.log('Permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        };
        init();
    }, []);

    return (
        <Provider store={store}>
            <RootNavigator/>
        </Provider>
    );
};

export default App;
