import { StyleSheet, Image, View } from "react-native";
import React, { useEffect } from "react";
import logo from "../../assets/ios/logo.png";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  const  _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userData");
            if (value !== null) {
                let user = JSON.parse(value);
                if (user.role === "admin") {
                    setTimeout(() => {
                        navigation.replace("AdminLayout", {
                            authUser: JSON.parse(value),
                        });
                    }, 2000);
                } else {
                    setTimeout(() => {
                        navigation.replace("CustomerLayout", {
                            user: JSON.parse(value),
                        });
                    }, 2000);
                }
            } else {
                console.log("no user");
                setTimeout(() => {
                    navigation.replace("Login");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        _retrieveData();
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
    splashText: {
        color: "blue",
        fontSize: 50,
        fontWeight: "bold",
    },
    logo: {
        resizeMode: "contain",
        width: 80,
        height: 80,
    },
});
