import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "./DashboardScreen";
import CarScreen from "./CarScreen";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "./ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarForm from "../../components/CarForm";
import * as SplashScreen from "expo-splash-screen";
import MyParkings from "./MyParkings";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator(); 

const CarStack = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="CarList"
        component={CarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CarForm"
        component={CarForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyParkings"
        component={MyParkings}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Car") {
            iconName = "car-rental";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarVisible: route.name !== "Car",
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "#f4511e",
        },
        labelStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Car" component={CarStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export default Dashboard;
