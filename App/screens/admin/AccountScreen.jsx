import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import authStore from '../../services/auth/auth.store';

const AccountScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await authStore.getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion du compte</Text>
      {userData && (
        <View style={styles.profile}>
          <Image style={styles.avatar} source={require('../../../assets/images/avatar.png')} />
          <Text style={styles.name}>{userData.firstame}</Text>
          <Text style={styles.name}>{userData.lastName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      )}
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
});

export default AccountScreen;