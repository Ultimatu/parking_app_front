import React from 'react';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AppLogo = () => (
    <Animatable.View animation="slideInDown" duration={1500}>
        <Image
            source={require('../../assets/android/drawable-mdpi/logo.png')}
            style={{ width: 140, height: 100, marginBottom: 10 }}
        />
    </Animatable.View>
);

export default AppLogo;
