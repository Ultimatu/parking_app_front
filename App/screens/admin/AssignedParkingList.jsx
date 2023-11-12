import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LottieView from 'lottie-react-native';
import { deleteAssignment, getAllAssignments } from "../../services/api/adminEndpoint";
import authStore from "../../services/auth/auth.store";

const AssignedParkingList = ({ onCancel }) => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      const token = await authStore.getJwtToken();
      const assignmentsData = await getAllAssignments(token);
      setAssignments(assignmentsData);
      setIsLoading(false);
    };

    fetchAssignments();
  }, [onCancel]);

  const handleAssign = (assignmentId) => {
    console.log(`Assign parking with ID ${assignmentId}`);
  };

  const handleDelete = async (assignmentId) => {
    if (!assignmentId) {
      
      return;
    }
    console.log(`Delete parking with ID ${assignmentId}`);
    const token = await authStore.getJwtToken();
    const response =  await deleteAssignment(token, assignmentId);
    if (response.status === 204 ) {
      console.log("response");
      const newAssignments = assignments.filter(
        (assignment) => assignment.id !== assignmentId
      );
      setAssignments(newAssignments);
      onCancel();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const renderItem = ({ item }) => (
    <View style={styles.assignmentItem}>
      <Text>
        User: {item.user.firstName} {item.user.lastName}
      </Text>
      <Text>
        Parking: {item.parkingSpace.parkingNumber} - {item.parkingSpace.address}
      </Text>
      <Text>Assignment Date: {item.assDate}</Text>
      <Text>Etage: {item.floorNumber}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={assignments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <LottieView source={require('../.././../assets/animation/empthyparking.json')} autoPlay loop />
            }
          />
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  assignmentItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  assignButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default AssignedParkingList;
