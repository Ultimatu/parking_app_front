import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import colors from './styles/color';

const AlertError = ({ visible, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    innerContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    message: {
        fontSize: 16,
        color: colors.error,
        marginBottom: 10,
    },
    closeButton: {
        fontSize: 16,
        color: colors.primary,
        textAlign: 'center',
    },
});

export default AlertError;
