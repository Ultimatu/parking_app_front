import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const SubmitButton = ({ title, onPress, icon = null, color = '#2196F3' }) => {
    const buttonStyle = {
        ...styles.button,
        backgroundColor: color, 
    };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            {icon && (
                <IconButton icon={icon} color="white" size={24} style={styles.icon} />
            )}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        textAlign: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        marginRight: 8,
    },
});

export default SubmitButton;
