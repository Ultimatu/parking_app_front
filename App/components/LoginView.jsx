import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import SubmitButton from "./SubmitButton";
import sharedStyles from "../shared/styles/style";
import colors from "../shared/styles/color";
import authService from "../services/auth/auth.service";
import authStore from "../services/auth/auth.store";
import AppLogo from "../shared/AppLogo";
import { useNavigation } from "@react-navigation/native";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    //trim and lowercase email
    let newEmail = email.trim().toLowerCase();

    const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!mailPattern.test(newEmail)) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      setIsLoading(true);

      const credentials = {
        email: newEmail,
        password: password,
      };

      const response = await authService.login(credentials);

      if (response) {
        console.log(response.newUser)
        console.log(response.accessToken)
        await authStore.saveJwtToken(response.accessToken);
        await authStore.saveUserData(response.newUser);
        setError(null);

        const userRole = response.newUser.role;
        
        navigation.navigate("splash")
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <AppLogo />
      <Text style={{ ...sharedStyles.title, color: colors.heading }}>
        Connexion
      </Text>
      <TextInput
        style={sharedStyles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ ...sharedStyles.input, backgroundColor: colors.white }}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <SubmitButton title="Connexion" onPress={handleSignIn} />

      {isLoading && (
        <ActivityIndicator size="large" color={colors.primary} />
      )}

      <Text style={styles.errorMessage}>{error}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>Vous n'avez pas de compte ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  registerLink: {
    color: colors.primary,
    marginTop: 10,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default LoginView;
