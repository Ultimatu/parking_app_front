import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthStore {
    /**
     * Enregistre le jeton JWT en toute sécurité
     * @param token
     */
    async saveJwtToken(token) {
        try {
            await AsyncStorage.setItem("accessToken", token);
            console.log("Jeton JWT sauvegardé en toute sécurité");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du jeton JWT :", error);
        }
    }

    /**
     * Récupère le jeton JWT
     * @returns Jeton JWT
     */
    async getJwtToken() {
        try {
            const token = await AsyncStorage.getItem("accessToken");
            if (token !== null) {
                return token;
            }
            return null;
        } catch (error) {
            console.error("Erreur lors de la récupération du jeton JWT :", error);
            return null;
        }
    }

    /**
     * Récupère les données de l'utilisateur
     * @param userData Données de l'utilisateur
     */
    async saveUserData(userData) {
        try {
            const jsonUserData = JSON.stringify(userData);
            await AsyncStorage.setItem("userData", jsonUserData);
            console.log("Données de l'utilisateur sauvegardées avec succès");
        } catch (error) {
            console.error(
                "Erreur lors de la sauvegarde des données de l'utilisateur :",
                error
            );
        }
    }

    /**
     * Récupère les données de l'utilisateur
     * @returns Données de l'utilisateur
     */
    async getUserData() {
        try {
            const jsonUserData = await AsyncStorage.getItem("userData");
            if (jsonUserData !== null) {
                const userData = JSON.parse(jsonUserData);
                return userData;
            }
            return null; // Aucune donnée d'utilisateur trouvée
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données de l'utilisateur :",
                error
            );
            return null;
        }
    }

    /**
     * Supprime les données de l'utilisateur
     */
    async deleteUserData() {
        try {
            await AsyncStorage.removeItem("userData");
            console.log("Données de l'utilisateur supprimées");
        } catch (error) {
            console.error(
                "Erreur lors de la suppression des données de l'utilisateur :",
                error
            );
        }
    }

    /**
     * Supprime le jeton JWT
     */
    async deleteJwtToken() {
        try {
            await AsyncStorage.removeItem("accessToken");
            console.log("Jeton JWT supprimé");
        } catch (error) {
            console.error("Erreur lors de la suppression du jeton JWT :", error);
        }
    }

    async isAuthenticated() {

        try {
            const token = await this.getJwtToken();
            if (token !== null) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async getRole() {
        const userData = await this.getUserData();
        if (userData !== null) {
            return userData.role;
        }
        return null;
    }
}

export default new AuthStore();