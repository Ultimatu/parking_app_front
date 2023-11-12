import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import authService from '../../services/auth/auth.service';
import { MaterialIcons } from '@expo/vector-icons';
import UserManagmentScreen from './UserManagmentScreen';
import ParkingManagementScreen from './ParkingManagmentScreen';
import AccountScreen from './AccountScreen';
import AdminDashboardScreen from './AdminDashboardScreen';

const Tab = createBottomTabNavigator();

const AdminLayout = ({ navigation }) => {
  return (
    <Tab.Navigator 
      initialRouteName="Dashboard"
      tabBarScreen={{
        style: {
          backgroundColor: '#fff',

        },
        tabBarActiveTintColor: 'tomato',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerBackground: () => (
            <View style={{ backgroundColor: '#rd2323', flex: 1 }} />
          ),
          headerBackgroundContainerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: 'tomato',

        }}
      />
      <Tab.Screen
        name="UserManagement"
        component={UserManagmentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="group" size={size} color={color} />
          ),
          headerBackground: () => (
            <View style={{ backgroundColor: '#tomato', flex: 1 }} />
          ),
          headerShown: true,
          fadeAnimation: true,
          freezeOnBlur: true,
          tabBarAllowFontScaling: true,
          headerTitle: 'Gestion des utilisateurs',
          headerTitleAlign: 'center',
          tabBarActiveTintColor: 'tomato',
        }}
      />
      <Tab.Screen
        name="ParkingManagement"
        component={ParkingManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-parking" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Gestion des parkings',
          headerTitleAlign: 'center',
          headerBackground: () => (
            <View style={{ backgroundColor: '#rd2323', flex: 1 }} />
          ),
          headerBackgroundContainerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: 'tomato',

        }}
      />
      <Tab.Screen
        name="ProfileInfo"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Admin Profile',
          headerTitleAlign: 'center',
          headerBackground: () => (
            <View style={{ backgroundColor: '#rd2323', flex: 1 }} />
          ),
          headerBackgroundContainerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: 'tomato',
        }}
      />
    </Tab.Navigator>
  );
};
AdminLayout.navigationOptions = {
  headerTitle: 'Parking System',
  headerRight: () => (
    <Button
      onPress={() => authService.logout()}
      title="Logout"
      color="#000"
    />
  ),

};
export default AdminLayout;
