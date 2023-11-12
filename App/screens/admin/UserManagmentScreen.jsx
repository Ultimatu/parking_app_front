import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserList from './UserList';

const UserManagmentScreen = ({ navigation }) => {

  //refresh the screen all the time the user come back to it
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
        <ScrollView>
          <UserList />
        </ScrollView>
    </>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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

    //animation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    elevation: 5, 

  },

});

export default UserManagmentScreen;
