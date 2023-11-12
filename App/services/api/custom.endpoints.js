import axios from "axios";
import { API_ENDPOINTS } from "../../constant/constant";
import authStore from "../auth/auth.store";
import authService from "../auth/auth.service";


// Add a response interceptor to handle 401 errors if JWT is expired
// axios.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     function (error) {
//       if (error.response.status === 401) {
//         authService.logout();
//       }
//       return Promise.reject(error);
//     }
// );
// const handleRequest = async (method, url, token, data = null) => {
//   try {
//     const requestOptions = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       ...(data && { body: JSON.stringify(data) }),
//     };

//     const response = await axios[method](url, requestOptions);

//     if (
//       response.status === 201 ||
//       response.status === 202 ||
//       response.status === 200
//     ) {
//       console.log(response.data);
//       return response.data;
//     } else {
//       console.error("Erreur lors de l'enregistrement :", response.status);
//       return null;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.log("Server responded with status code:", error.response.status);
//       console.log("Response data:", error.response.data);
//     } else if (error.request) {
//       console.log("No response received:", error.request);
//     } else {
//       console.log("Error creating request:", error.message);
//     }
//     return null;
//   }
// };

// /**
//  * Class CustomerService
//  * @class CustomerService  Service de gestion des clients
//  * @requires axios
//  * @requires API_ENDPOINTS
//  * @requires authStore
//  */
// class CustomerService {

//   /**
//    * Add a car to the customer database
//    * @param {Object} car - The car object to be added
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The new car added or null if an error occurs
//    */
//   async addCar(car, token) {
//     return handleRequest("post", API_ENDPOINTS.CARS, token, car);
//   }

//   /**
//    * Update a car
//    * @param {Object} car - The car object to be updated
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The updated car or null if an error occurs
//    */
//   async updateCar(car, token) {
//     return handleRequest("put", API_ENDPOINTS.CAR_BY_ID + car.id, token, car);
//   }

//   /**
//    * Delete a car
//    * @param {Object} car - The car object to be deleted
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The deleted car or null if an error occurs
//    */
//   async deleteCar(car, token) {
//     return handleRequest("delete", API_ENDPOINTS.CAR_BY_ID + car.id, token);
//   }

//    /**
//    * Get all cars for a user
//    * @param {string} token - The user's authentication token
//    * @param {string} userId - The user ID
//    * @returns {Array|null} - An array of cars or null if an error occurs
//    */
//   async getAllCars(token, userId) {
//     return handleRequest("get", API_ENDPOINTS.CAR_BY_USER_ID + userId, token);
//   }

//   /**
//    * Get a car by ID
//    * @param {Object} car - The car object containing the ID
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The requested car or null if an error occurs
//    */
//   async getCarById(car, token) {
//     return handleRequest("get", API_ENDPOINTS.CAR_BY_ID + car.id, token);
//   }

//   /**
//    * Update user profile
//    * @param {Object} user - The user object to be updated
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The updated user or null if an error occurs
//    */
//   async updateUser(user, token) {
//     return handleRequest("put", API_ENDPOINTS.PROFILE + user.id, token, user);
//   }

//   /**
//    * Get user profile
//    * @param {string} token - The user's authentication token
//    * @returns {Object|null} - The user profile or null if an error occurs
//    */
//   async getUserProfile(token) {
//     return handleRequest("get", API_ENDPOINTS.PROFILE + authStore.user.id, token);
//   }
// }

// export default new CustomerService();


/**
 * Class CustomerService
 * @class CustomerService  Service de gestion des clients
 * @requires axios
 * @requires API_ENDPOINTS
 * @requires authStore
 */
class CustomerService {
  //add car, update car, delete car, get all cars, get car by id user

  // update user profile, get user profile
  // get all assignments, get assignment by id, get assignment by imma

  /**
   * Add a car to the customer database
   * @param {*} car
   * @returns  New car added
   */
  async addCar(car, token) {
    try {

      console.log("request", car);
      console.log(token)
      const response = await axios.post(API_ENDPOINTS.CARS, car, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
        console.log("response", response.data);
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }

  /**
   * Update a car
   * @param {*} car
   * @returns  Car updated
   */
  async updateCar(car, token) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(API_ENDPOINTS.CAR_BY_ID + car.id, car, requestOptions);
  
      console.log(response);
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
        return response.data;
      } else {
        console.error("Erreur lors de la mise à jour de la voiture :", response.status);
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
        console.log("Error creating request from delete car:", error.message);
      }
    }
  }
  

  /**
   * Delete a car
   * @param {*} car
   * @returns  Car deleted
   */
  async deleteCar(car, token) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.delete(API_ENDPOINTS.CAR_BY_ID + car.id, requestOptions);
  
      console.log(response);
      if (
        response.status === 204 ) {
        console.log("response", response.data);
        return response.user;
      } else {
        console.error("Erreur lors de la suppression de la voiture :", response.status);
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
        console.log("Error creating request from delete car:", error.message);
      }
    }
  }
  

  /**
   * Get all cars
   * @returns  All cars
   */
  async getAllCars(token, userId) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(API_ENDPOINTS.CAR_BY_USER_ID + userId, requestOptions);
  
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request from get all car:", error.message);
      }
    }
  }
  

  /**
   * Get a car by id
   * @param {*} car
   * @returns  Car
   */

  async getCarById(car, token) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_ENDPOINTS.CAR_BY_ID + car.id, requestOptions);
      

      console.log(response);
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }

  /**
   * Update user profile
   * @param {*} user
   * @returns  User updated
   */
  async updateUser(user, token) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      };

      const response = await axios.put(API_ENDPOINTS.PROFILE + user.id, requestOptions);

      console.log(response);
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }

  /**
   * Get user profile
   * @returns  User profile
   */

  async getUserProfile(token) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_ENDPOINTS.PROFILE + authStore.user.id, requestOptions);

      console.log(response);
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }

  async myParkings(token, userId) {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_ENDPOINTS.PARKING_SPACE_BY_ID + userId, requestOptions);
      if (
        response.status === 201 ||
        response.status === 202 ||
        response.status === 200
      ) {
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
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    }
  }
  
}

export default new CustomerService();
