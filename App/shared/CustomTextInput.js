import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry = false, style }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default CustomTextInput;
