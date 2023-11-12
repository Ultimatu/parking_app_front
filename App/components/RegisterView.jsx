import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import sharedStyles from "../shared/styles/style";
import authService from "../services/auth/auth.service";
import { useNavigation } from "@react-navigation/native";
import AppLogo from "../shared/AppLogo";
import authStore from "../services/auth/auth.store";
import SubmitButton from "./SubmitButton";
import colors from "../shared/styles/color";
import LottieView from "lottie-react-native";

const RegisterView = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayLottie, setDisplayLottie] = useState(false);
  const navigation = useNavigation();

  const handleRegister = () => {
    setError(null);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!mailPattern.test(email)) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    authService
      .register(data)
      .then((response) => {
        setIsLoading(false);
        if (response) {
          setDisplayLottie(true);
          authStore.saveJwtToken(response.accessToken);
          authStore.saveUserData(response.newUser);

          setTimeout(() => {
            setDisplayLottie(false);
            navigation.navigate("Login");
          }, 5000);
        } else {
          setError(`Erreur d'inscription: ${response.message}`);
        }
      })
      .catch((error) => {
        if (error.message === "User already exists") {
          setError("Cet email est déjà associé à un compte.");
        } else {
          setError(`Erreur d'inscription: ${error.message}`);
        }
        setIsLoading(false);
      });
  };

  const handleSignInLink = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <AppLogo />
      {displayLottie ? (
        <LottieView
          source={require("../../assets/animation/registration-success.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <>
          <Text style={{ ...sharedStyles.title, color: colors.heading }}>
            Inscription
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={{ ...sharedStyles.input, backgroundColor: colors.white }}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
            required
          />
          <TextInput
            style={{ ...sharedStyles.input, backgroundColor: colors.white }}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
            required
          />
          <TextInput
            style={{ ...sharedStyles.input, backgroundColor: colors.white }}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            required
          />
          <TextInput
            style={{ ...sharedStyles.input, backgroundColor: colors.white }}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            required
          />
          <TextInput
            style={{ ...sharedStyles.input, backgroundColor: colors.white }}
            placeholder="Confirmer le mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            required
          />
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <SubmitButton
              onPress={handleRegister}
              title="Inscrire"
            />
          )}
          <TouchableOpacity style={styles.loginLink} onPress={handleSignInLink}>
            <Text style={styles.loginLinkText}>
              Vous avez déjà un compte ? Se connecter
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: colors.primary,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RegisterView;
