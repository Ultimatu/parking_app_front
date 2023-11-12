import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {
  addAssignment,
  getAllParkingSpaces,
  getAllUsers,
} from "../../services/api/adminEndpoint";
import authStore from "../../services/auth/auth.store";
import { ActivityIndicator } from "react-native";

const AssignementForm = ({ navigation, onCancel }) => {
  const [userId, setUserId] = useState("");
  const [parkingSpaceId, setParkingSpaceId] = useState("");
  const [users, setUsers] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    const token = await authStore.getJwtToken();
    const allUsers = await getAllUsers(token);
    const usersWithoutAdmin = allUsers.filter((user) => user.role !== "admin");
    const allParkings = await getAllParkingSpaces(token);
    const availableParkings = allParkings.filter(
      (parking) => parking.isAvailable
    );

    setUsers(usersWithoutAdmin);
    setParkings(availableParkings);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getUserById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user : null;
  };

  const getParkingById = (parkingId) => {
    const parking = parkings.find((parking) => parking.id === parkingId);
    return parking ? parking : null;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await authStore.getJwtToken();
    const selectedUser = getUserById(userId);
    const selectedParking = getParkingById(parkingSpaceId);

    const data = {
      userId: selectedUser ? selectedUser.id : "",
      parkingSpaceId: selectedParking ? selectedParking.id : "",
    };

    if (selectedUser === null || selectedParking === null) {
      setError("Veuillez remplir tous les champs");
      setIsLoading(false);
      return;
    }

    console.log(data);
    const response = await addAssignment(token, data);
    if (response) {
      onCancel();
    }
  };

  const handleBack = () => {
    onCancel();
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : users.length > 0 && parkings.length > 0 ? (
        <View style={styles.form}>
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.header}>Assinger un Parking à Utilsateur </Text>

          <Text>Utilisateur:</Text>
          <SelectDropdown
            data={users.map((user) => user.id)}
            onSelect={(selectedItem, index) => setUserId(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) =>
              getUserById(selectedItem)?.firstName +
              " " +
              getUserById(selectedItem)?.lastName
            }
            rowTextForSelection={(item, index) =>
              getUserById(item)?.firstName + " " + getUserById(item)?.lastName
            }
            defaultValueByIndex={0}
          />

          <Text>Parking:</Text>

          <SelectDropdown
            data={parkings.map((parking) => parking.id)}
            onSelect={(selectedItem, index) => setParkingSpaceId(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) =>
              getParkingById(selectedItem)?.parkingNumber +
              " " +
              getParkingById(selectedItem)?.address
            }
            rowTextForSelection={(item, index) =>
              getParkingById(item)?.parkingNumber +
              " " +
              getParkingById(item)?.address
            }
            defaultValueByIndex={0}
          />

        <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Back" color={'red'} onPress={handleBack} />
          </View>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AssignementForm;
