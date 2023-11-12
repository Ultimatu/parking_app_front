import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import authStore from "../../services/auth/auth.store";
import ParkingForm from "./ParkingForm";
import LottieView from "lottie-react-native";
import {
  createParkingSpace,
  deleteParkingSpace,
  getAllParkingSpaces,
  updateParkingSpace,
} from "../../services/api/adminEndpoint";

const ParkingList = ({ navigation, onCancel }) => {
  const [parkings, setParkings] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = async () => {
    const token = await authStore.getJwtToken();
    return token;
  };

  const fetchParkings = async () => {
    setIsLoading(true);
    const token = await getToken();
    console.log(token);
    const response = await getAllParkingSpaces(token);
    console.log(response);
    if (response) {
      if (response.length > 0) {
        setParkings(response);
      }
      console.log(parkings);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchParkings();
  }, []);

  const handleAddParking = async (parking) => {
    setIsLoading(true);
    console.log(parking);

    const token = await getToken();
    let response;
    console.log(parking);
    if (!parking.id || parking.id === null) {
      console.log("create");
      response = await createParkingSpace(token, parking);
    } else {
      console.log("update");
      response = await updateParkingSpace(token, parking.id, parking);
    }
    console.log(response);
    if (response) {
      setParkings([...parkings, response]);
      setIsEditing(false);
      setIsAdding(false);
    }
    setIsLoading(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    onCancel();
  };

  // const handleUpdateParking = async (parking) => {
  //   setIsLoading(true);
  //   const token = await getToken();
  //   console.log(token);
  //   const response = await updateParkingSpace(token, parking.id, parking);
  //   console.log(response);
  //   if (response) {
  //     setParkings(parkings.map((p) => (p.id === parking.id ? response : p)));
  //     setSelectedParking(null);
  //     setIsEditing(false);
  //     setIsAdding(false);
  //   }
  //   setIsLoading(false);
  //   fetchParkings();
  // };

  const handleDeleteParking = async (id) => {
    setIsLoading(true);
    const token = await getToken();
    const response = await deleteParkingSpace(token, id);
    console.log(response);
    if (response) {
      setParkings(parkings.filter((p) => p.id !== id));
    }
    setIsLoading(false);
    fetchParkings();
  };

  const handleEditParking = (parking) => {
    setSelectedParking(parking);
    setIsEditing(true);
  };
  const handleAdd = () => {
    setSelectedParking(null);
    setIsAdding(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleEditParking(item)}
    >
      {isLoading ? (
         <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.itemDetails}>
            <LottieView source={require("../../../assets/animation/car.json")} autoPlay loop style={{width: 100, height: 100}}/>
            <Text style={styles.itemText}>Numero du parking: {item.parkingNumber}</Text>
            <Text style={styles.itemText}>Etage: {item.floor}</Text>
            <Text style={styles.itemText}>Disponible: {item.isAvailable ? "Oui" : "Non"}</Text>
            <Text style={styles.itemText}>Heure d'ouverture: {item.openTime}</Text>
            <Text style={styles.itemText}>Heure de fermeture: {item.closeTime}</Text>
            <Text style={styles.itemText}>Adresse: {item.address}</Text>
          </View>
          <View style={styles.itemActions}>
            <TouchableOpacity onPress={() => handleEditParking(item)}>
              <MaterialIcons name="edit" size={24} style={styles.editIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteParking(item.id)}>
              <MaterialIcons
                name="delete"
                size={24}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.formContrainer}>
       <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => handleCancel()}
          >
            <MaterialIcons name="arrow-back" size={24} style={styles.addIcon} />
          </TouchableOpacity>
      {isEditing || isAdding ? (
        <ParkingForm
          onSubmit={handleAddParking}
          initialValues={selectedParking}
          onCancel={() => { setIsEditing(false); setIsAdding(false); }}
        />
      ) : (
        <>
          <FlatList
            data={parkings}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
         

          <TouchableOpacity
            style={styles.absoluteFixedButton}
            onPress={() => handleAdd()}
          >
            <MaterialIcons name="add" size={24} style={styles.addIcon} />
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
    maxWidth: "100%",
    width: "100%",
    height: "100%",
  },
  formContrainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    maxWidth: "100%",
    width: "100%",
    height: "100%",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#d4d4d4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 5,
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 70,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    marginBottom: 3,
    marginTop: 3,
    color: "#fff",
  },
  editIcon: {
    color: "blue",
  },
  deleteIcon: {
    color: "#dc3545",
  },
  absoluteFixedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "tomato",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

export default ParkingList;
