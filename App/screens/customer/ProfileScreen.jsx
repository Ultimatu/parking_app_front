import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import LogoutButton from "../../components/LogoutButton";
import authStore from "../../services/auth/auth.store";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(authStore.getUserData());

  async function getUserData() {
    const userData = await authStore.getUserData();
    setUserData(userData);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../../../assets/images/avatar.png")}
        />
        <Text style={styles.userName}>
          {userData.firstName} {userData.lastName}
        </Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <LogoutButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
  },
  buttonContainer: {
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
