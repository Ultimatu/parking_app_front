import axios from "axios";
import { API_ENDPOINTS } from "../../constant/constant";
import authStore from "./auth.store";

class AuthService {
  async login(credentials) {
    try {
      console.log("request", credentials);
      console.log("request from", API_ENDPOINTS.LOGIN);
      
      const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);

      if (response.status === 200 || response.status === 201 || response.status === 202) {
        return response.data;
      } else {
        console.log("ops");
        console.error("Erreur de connexion :", response.status);
        return null;
      }
    } catch (error) {
      if (error.response) {
        console.log(
          "Server responded with status code:",
          error.response.status
        );
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }

  /**
   * Fonction d'enregistrement d'un nouvel utilisateur
   * @param {*} newUser
   * @returns  Nouvel utilisateur enregistré
   */
  async register(newUser) {
    try {
      const response = await axios.post(API_ENDPOINTS.SIGNUP, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (response.status === 201 || response.status === 202 || response.status === 200) {
        return response.data;
      } else {
        console.error("Erreur lors de l'enregistrement :", response.status);
        return null;
      }
    } catch (error) {
        if (error.response) {
            console.log(
            "Server responded with status code:",
            error.response.status
            );
            console.log("Response data:", error.response.data);
            throw (error.response.data)
        } else if (error.request) {
            console.log("No response received:", error.request);
        } else {
            console.log("Error creating request:", error.message);
            throw (error)
        }
    }
  }

  async logout() {
    try {
      await authStore.deleteJwtToken();
      await authStore.deleteUserData();
      console.log("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }
}

export default new AuthService();
