import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView
} from "react-native";
import authStore from "../services/auth/auth.store";

const CarForm = ({ onSubmit, initialValues = null }) => {
  const [imma, setImma] = useState(initialValues?.imma || "");
  const [brand, setBrand] = useState(initialValues?.brand || "");
  const [color, setColor] = useState(initialValues?.color || "");
  const [id, setId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const [displayError, setDisplayError] = useState(false)


  const useInitialValues = () => {
    if (initialValues !== null) {
      setId(initialValues.id);
      setImma(initialValues.imma);
      setBrand(initialValues.brand);
      setColor(initialValues.color);
    }
  }

  const handleSubmit = async () => {
    if (imma === "" || brand === "" || color === ""){
      console.log("emphty filed")
      setErrorMessage("Veuillez remplir tous les champs")
      setDisplayError(true)
      return
    }
    setDisplayError(false)
    const owner = await authStore.getUserData();
    
    const token = await authStore.getJwtToken();

    const car = {
      id: id,
      imma,
      brand,
      color,
      ownerId: owner.id,
    };
    onSubmit(car);

    
  };

  useEffect(() => {
    useInitialValues();
  }, [initialValues]);

 const renderForm = () => {
    return (
      <ScrollView>
        {displayError && <Text style={{color: "red"}}>{errorMessage}</Text>}

        <Text style={styles.label}>Immatriculation:</Text>
        <TextInput style={styles.input} value={imma} onChangeText={setImma} />

        <Text style={styles.label}>Marque:</Text>
        <TextInput style={styles.input} value={brand} onChangeText={setBrand} />

        <Text style={styles.label}>Couleur:</Text>
        <TextInput style={styles.input} value={color} onChangeText={setColor} />

        <Button title="Valider" onPress={handleSubmit} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une voiture</Text>
      {renderForm()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default CarForm;


