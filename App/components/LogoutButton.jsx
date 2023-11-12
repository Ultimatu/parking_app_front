import React from 'react';
import authService from '../services/auth/auth.service';
import { Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const LogoutButton = () => {
    const dispatch = useNavigation();

    const handleLogout = async () => {
        await authService.logout();
        dispatch.navigate('Login');
    };

    return (
        <Button onPress={handleLogout}  style = {styles.logoutButton} title="Logout" />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    splashText: {
        color: 'blue',
        fontSize: 50,
        fontWeight: 'bold'
    },
    logoutButton: {
        color: 'red',
        fontSize: 50,
        fontWeight: 'bold'
    }


});

export default LogoutButton;
