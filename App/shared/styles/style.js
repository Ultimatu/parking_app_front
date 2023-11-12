import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,

  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInputInvalid: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  textInputValid: {
    color: 'green',
    fontSize: 12,
    marginBottom: 10,
  },
  


});

export default sharedStyles;