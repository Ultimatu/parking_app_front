import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, ActivityIndicator, Touchable, TouchableOpacityBase, TouchableOpacity } from 'react-native';

const ParkingForm = ({ onSubmit, initialValues = null, onCancel }) => {
    const [parkingNumber, setParkingNumber] = useState( '');
    const [floor, setFloor] = useState( '');
    const [isAvailable, setIsAvailable] = useState(true);
    const [openTime, setOpenTime] = useState( '');
    const [closeTime, setCloseTime] = useState( '');
    const [address, setAddress] = useState( '');
    const [id, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [displayError, setDisplayError] = useState(false);

    const useInitialValues =  () => {
        if (initialValues !== null) {
            setId(initialValues.id);
            setParkingNumber(initialValues.parkingNumber);
            setFloor(initialValues.floor);
            setIsAvailable(initialValues.isAvailable);
            setOpenTime(initialValues.openTime);
            setCloseTime(initialValues.closeTime);
            setAddress(initialValues.address);
        }
    }


    const handleSubmit = () => {
        setIsLoading(true);
        if (parkingNumber === '' || floor === '' || openTime === '' || closeTime === '' || address === '') {
            setError('Veuillez remplir tous les champs');
            setDisplayError(true);
            setIsLoading(false);
            return;
        }
        const parkingSpace = {
            id: id,
            parkingNumber,
            floor: parseInt(floor),
            isAvailable: isAvailable,
            openTime,
            closeTime,
            address,
        };
        if (initialValues !== null) {
            parkingSpace.id = initialValues.id;
        }
        setError(null);

        onSubmit(parkingSpace);
        setIsLoading(false);
    };

    const onCancelB = () => {
        onCancel();
    }

    useEffect(() => {
        useInitialValues();
    }, [initialValues]);



    return (
        <View style={styles.container}>
            {displayError ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : null}
            <Text style={styles.label}>Numero du parking:</Text>
            <TextInput style={styles.input} value={parkingNumber} onChangeText={setParkingNumber} />

            <Text style={styles.label}> Nombre de places:</Text>
            <TextInput style={styles.input} value={floor} onChangeText={setFloor} />

            <Text style={styles.label}>Disponibilité:</Text>
            <Switch value={isAvailable} onValueChange={setIsAvailable} />

            <Text style={styles.label}>Heure d'ouverture:</Text>
            <TextInput style={styles.input} value={openTime} onChangeText={setOpenTime} />

            <Text style={styles.label}>Heure de fermeture:</Text>
            <TextInput style={styles.input} value={closeTime} onChangeText={setCloseTime} />

            <Text style={styles.label}>Addresse:</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Submit" onPress={handleSubmit} />
            )}

            <TouchableOpacity style={styles.cancelButton} onPress={onCancelB} >
                <Text>Annuler</Text>
            </TouchableOpacity>

        </View>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        fontSize: 18,
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },


});

export default ParkingForm;
