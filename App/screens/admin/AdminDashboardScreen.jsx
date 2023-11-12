import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { getAllParkingSpaces, getAllUsers, getAllCars } from "../../services/api/adminEndpoint";
import authStore from "../../services/auth/auth.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PieChart from "react-native-pie-chart";

const AdminDashboardScreen = () => {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [parkings, setParkings] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = async () => {
    const tokenN = await authStore.getJwtToken();
    setToken(tokenN);
  };

  const fetchUsers = async () => {
    const response = await getAllUsers(token);
    setUsers(response.filter((user) => user.role !== "admin"));
  };

  const fetchCars = async () => {
    const response = await getAllCars(token);
    setCars(response);
  };

  const fetchParkings = async () => {
    const response = await getAllParkingSpaces(token);
    setParkings(response);
  };

  const countData = (data) => {
    const _ = require("lodash");
    console.log(_.countBy(data, "id"));
    return _.countBy(data, "id");
  };

  useEffect(() => {
    setIsLoading(true);
    fetchToken();
    if (token !== null) {
      Promise.all([fetchUsers(), fetchCars(), fetchParkings()]).then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });
    }
    countData(users);
    countData(cars);
    countData(parkings);
  }, [token]);

  const series = [users.length, cars.length, parkings.length];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <Card style={styles.card}>
            <Card.Title
              title="Total Users"
              left={(props) => (
                <MaterialCommunityIcons {...props} name="account" size={24} color="black" />
              )}
            />
            <Card.Content>
              <Text style={styles.cardText}>{series[0]}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title="Total Cars"
              left={(props) => (
                <MaterialCommunityIcons {...props} name="car" size={24} color="black" />
              )}
            />
            <Card.Content>
              <Text style={styles.cardText}>{series[1]}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title="Total Parking Spaces"
              left={(props) => (
                <MaterialCommunityIcons {...props} name="parking" size={24} color="black" />
              )}
            />
            <Card.Content>
              <Text style={styles.cardText}>{series[2]}</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Data Overview" />
            <Card.Content>
              {/* <PieChart
                style={{ height: 200 }}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.45}
                coverFill="#FFF"
              /> */}
            </Card.Content>
          </Card>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    backgroundColor: "#fff",
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default AdminDashboardScreen;
