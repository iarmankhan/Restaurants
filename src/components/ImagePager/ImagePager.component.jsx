import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {isValidUrl} from '../../utils/isValidURL';
import Images from '../Images/Images.component';

const ImagePager = ({images}) => {
    return (
        <ViewPager style={{flex: 1}} initialPage={0} showPageIndicator={true}>
            {
                images.map((image, index) => {
                    if (!isValidUrl(image)) {
                        return null;
                    }
                    return (
                        <View key={index}>
                            <Images
                                source={[{uri: image}, {uri: 'https://cdn.winsightmedia.com/platform/files/public/1200x630/chef-demo-cooking-saucing-dish.jpg'}]}
                                style={{width: '100%', flex: 1}}/>
                        </View>
                    );
                })
            }
        </ViewPager>
    );
};

export default ImagePager
