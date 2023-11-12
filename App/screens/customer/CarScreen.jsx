import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
  Image,
} from "react-native";
import customEndpoints from "../../services/api/custom.endpoints";
import authStore from "../../services/auth/auth.store";
import LottieView from "lottie-react-native";
import CarForm from "../../components/CarForm";
import { MaterialIcons } from "@expo/vector-icons";

const CarScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCarForm, setShowCarForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [parkings, setParkings] = useState([]);

  const fetchData = async () => {
    const token = await authStore.getJwtToken();
    const owner = await authStore.getUserData();

    const carData = await customEndpoints.getAllCars(token, owner.id);
    setCars(carData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [navigation]);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setShowCarForm(true);
  };

  const handleCreate = () => {
    setSelectedCar(null);
    setShowCarForm(true);
  };

  const handleDelete = async (car) => {
    const token = await authStore.getJwtToken();
    await customEndpoints.deleteCar(car, token);
    fetchData();
  };

  const closeModal = () => {
    setShowCarForm(false);
  };

  const handleAddCar = async (car) => {
    setIsLoading(true);
    console.log(car);

    const token = await authStore.getJwtToken();
    let response;
    if (car.id === null) {
      console.log("create");
      response = await customEndpoints.addCar(car, token);
    } else {
      console.log("update");
      response = await customEndpoints.updateCar(car, token);
    }
    console.log(response);
    if (response) {
      fetchData();
      setShowCarForm(false);
    }
    setIsLoading(false);
  };

  const handleFoundMyParkings = async () => {
    const token = await authStore.getJwtToken();
    const user = await authStore.getUserData();
    const parks = await customEndpoints.myParkings(token, user.id);
    setCars(...parkings, parks);
    setIsLoading(false);
  };

  const renderCarForm = () => {
    return (
      <Modal visible={showCarForm} animationType="slide">
        <CarForm onSubmit={handleAddCar} initialValues={selectedCar} />

        <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
          <Text>Annuler</Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  function CarListItem({ item, onEdit, onDelete }) {
    return (
      <View key={item.id} style={styles.carCard}>
        <TouchableOpacity onPress={() => displayCarDetails(item)}>
          <Image
            style={styles.carIcon}
            source={require("../../../assets/images/car.png")}
          />
          <Text style={styles.carImma}>{item.imma}</Text>
          <Text style={styles.carBrand}>{item.brand}</Text>
          <Text style={styles.carColor}>{item.color}</Text>
          <View key={item.id} style={styles.carIconsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onEdit(item)}
            >
              <MaterialIcons
                name="edit"
                size={24}
                color="blue"
                style={styles.editButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => onDelete(item)}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color="red"
                style={styles.deleteButton}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const renderCarListEmpty = () => {
    return (
      <View  style={styles.emptyListContainer}>
        {<LottieView
          source={require('../../../assets/animation/empthyparking.json')}
          autoPlay
          loop
          style={styles.emptyListAnimation}
        /> }
        <Text>Aucune voiture enregistrée</Text>
      </View>
    );
  };

  const renderCarListLoading = () => {
    return (
      <View style={styles.emptyListContainer}>
        {<LottieView
          source={require('../../../assets/animation/loading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />}
      </View>
    );
  };

  const displayCarDetails = (car) => {
    return (
      <View style={styles.oneCard}>
        <Image
          style={styles.carIcon}
          source={require("../../../assets/images/car.png")}
        />
        <Text>Immatriculation : {car.imma}</Text>
        <Text>Marque : {car.brand}</Text>
        <Text>Couleur : {car.color}</Text>
      </View>
    );
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Mes voitures</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
        <Text>Ajouter une voiture</Text>
      </TouchableOpacity>
      {isLoading ? (
        renderCarListLoading()
      ) : (
        <ScrollView style={styles.carList}>
          {cars.length === 0
            ? renderCarListEmpty()
            : cars.map((item) => (
                <CarListItem
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
        </ScrollView>
      )}
      {renderCarForm()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  carList: {
    flex: 1,
    width: '90%',
  },
  carCard: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  carImma: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  carBrand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  carColor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  carIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: "#3498db",
    padding: 15,
    margin: 10,
    borderRadius: 15,
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: 20,
    margin: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  loadingAnimation: {
    height: 200,
  },
  emptyListContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyListAnimation: {
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeModal: {
    backgroundColor: "red",
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
  },
  editButton: {
    fontSize: 26,
    color: "blue",
  },
  deleteButton: {
    fontSize: 26,
    color: "red",
  },
});
export default CarScreen;
