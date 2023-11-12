import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppLogo from '../shared/AppLogo';

const WelcomeView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppLogo />
      <Text style={styles.title}>Welcome to Your App</Text>
      <Text style={styles.description}>Explore our amazing features!</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Login')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF', // Light blue background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666', // Gray text color
  },
});

export default WelcomeView;
