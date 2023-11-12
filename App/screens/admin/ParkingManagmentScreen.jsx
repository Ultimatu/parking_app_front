import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ParkingList from './ParkingList';
import AssignementForm from './AssignementForm';
import AssignedParkingList from './AssignedParkingList';
import { MaterialIcons } from '@expo/vector-icons';

const ParkingManagementScreen = ({ navigation }) => {
  const [isMenuOption, setIsMenuOption] = useState(true);
  const [isAssignParking, setIsAssignParking] = useState(false);
  const [isViewParkList, setIsViewParkList] = useState(false);
  const [isViewAssignedParkList, setIsViewAssignedParkList] = useState(false);


  // Refresh the list of parking all the time the screen is open
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      console.log('refresh');
    });
    return unsubscribe;
  }, [navigation]);

  const handleBack = () => {
    setIsMenuOption(true);
    setIsAssignParking(false);
    setIsViewParkList(false);
    setIsViewAssignedParkList(false); 
  };


  const renderParkList = () => (
    <>
      <ParkingList onCancel={handleBack}/>
    </>
  );
  
  const renderAssignedParkList = () => (
    <>
      <AssignedParkingList onCancel={handleBack}/>
    </>
  );
  
  const renderAssignParking = () => (
    <>
      <AssignementForm onCancel={handleBack}/>
    </>
  );

  const renderMenuOption = () => (
    <View style={styles.menuOptionContainer}>
      <TouchableOpacity
        style={styles.menuOptionButton}
        onPress={() => {
          setIsMenuOption(false);
          setIsViewParkList(true);
          

        }}
      >
        <Text style={styles.menuOptionButtonText}>Voir les parkings</Text>
        <MaterialIcons name="edit" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuOptionButton}
        onPress={() => {
          setIsMenuOption(false);
          setIsAssignParking(true);
        }}
      >
        <Text style={styles.menuOptionButtonText}>Assigner un parking</Text>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuOptionButton}
        onPress={() => {
          setIsMenuOption(false);
          setIsViewAssignedParkList(true);
        }}
      >
        <Text style={styles.menuOptionButtonText}>Voir les parkings assignés</Text>
        <MaterialIcons name="local-parking" size={30} color="white" />
      </TouchableOpacity>

    </View>
  );

  return (
    <>
      {isMenuOption && renderMenuOption()}
      {isViewParkList && renderParkList()}
      {isAssignParking && renderAssignParking() }
      {isViewAssignedParkList && renderAssignedParkList()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    maxWidth: '100%',
    width: '100%',
    
  },
  headerBar: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // Animation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  menuOptionButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    margin: 0,
    width: '90%', 
    alignItems: 'center', 
    display: 'flex',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
    

  },
  menuOptionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20, 
    //tomato light for background
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    alignSelf: 'center',

  },
});

export default ParkingManagementScreen;
