import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const UserForm = ({ user, onSubmit , onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [displayError, setDisplayError] = useState(false);
  const [id, setId] = useState(null); 
  const navigation = useNavigation();




  const useInitialValues = () => {
    if (user !== null) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }

  }

  useEffect(() => {
    useInitialValues();
  }, [user]);
  const handleSubmit = () => {
    seIsLoading(true);
    if (email === "" || password === "" || firstName === "" || lastName === "") {
      setError("Veuillez remplir tous les champs");
      setDisplayError(true);
      seIsLoading(false);
      return;
    }
    if (password !== confirmPass) {
      setError("Les mots de passe ne correspondent pas");
      setDisplayError(true);
      seIsLoading(false);
      return;
    }
    const user = {
      id: id,
      email,
      password,
      firstName,
      lastName,
    };
    onSubmit(user);
    seIsLoading(false);
  };

  const onCancelB= () => {
      //navigation.navigate('splash');
     onCancel();
    
  }

  return (
    <View style={styles.container}
    >
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />

      

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPass}
        onChangeText={setConfirmPass}
        placeholder="Enter confirm password"
        secureTextEntry={true}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {displayError ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : null}

      <TouchableOpacity style={styles.canceButton} onPress={onCancelB}>
        <Text style={styles.buttonText}>Annuler</Text>
      </TouchableOpacity>
    </View>  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  canceButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },

});

export default UserForm;
