import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import authStore from "../../services/auth/auth.store";
import customEndpoints from "../../services/api/custom.endpoints";
import { useNavigation } from '@react-navigation/native';

const MyParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const handleFoundMyParkings = async () => {
    const token = await authStore.getJwtToken();
    const user = await authStore.getUserData();
    const parks = await customEndpoints.myParkings(token, user.id);
    setParkings(parks);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFoundMyParkings();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        parkings.map((parking, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>Parking number: {parking.parkingSpace.parkingNumber}</Title>
              <Paragraph>Floor: {parking.parkingSpace.floor}</Paragraph>
              <Paragraph>Address: {parking.parkingSpace.address}</Paragraph>
              <Paragraph>Open time: {parking.parkingSpace.openTime}</Paragraph>
              <Paragraph>Close time: {parking.parkingSpace.closeTime}</Paragraph>
            </Card.Content>
          </Card>
        ))
      )}
      <Button mode="contained" onPress={() => navigation.navigate('Dashboard')}>Retour</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
});

export default MyParkings;