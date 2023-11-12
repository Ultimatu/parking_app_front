import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import customEndpoints from "../../services/api/custom.endpoints";
import authStore from "../../services/auth/auth.store";

const DashboardScreen = () => {
  const [carCount, setCarCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchToken = async () => {
    const tokenN = await authStore.getJwtToken();
    const userN = await authStore.getUserData();
    setToken(tokenN);
    setUser(userN);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await fetchToken();
      if (token && user) {
        const cars = await customEndpoints.getAllCars(token, user.id);
        if (cars) {
          setCarCount(cars.length);
        }

        const parkings = await customEndpoints.myParkings(token, user.id);
        if (parkings) {
          let parkingsValues = parkings;
            if (!Array.isArray(parkings)) {
              parkingsValues = Object.values(parkings);
            }
            setParkingCount(parkingsValues.length);
            setAssignments(parkingsValues);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [token, user]);

  return (
    <View style={styles.container}>

      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Voitures</Title>
            <Paragraph style={styles.paraNumber}>{carCount}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            
            <Title style={styles.title}>Parkings</Title>
            <Paragraph style={styles.paraNumber}>{parkingCount}</Paragraph>
          </Card.Content>
        </Card>
      </View>

      {parkingCount === 0 && (
        <>
          <LottieView 
            source={require("../../../assets/animation/empthyparking.json")}
            style={styles.lottie}
            duration={3000}
            loop={false}
            autoPlay={true}
          />
          <Text style={styles.emptyText}>
            Vous n'avez pas encore de parking assigné
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lottie: {
    width: '100%',
    height: 200,
  },
  paraNumber: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default DashboardScreen;
