import axios from "axios";
import { API_ENDPOINTS } from "../../constant/constant";


// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       authService.logout();
//     }
//     return Promise.reject(error);
//   }
// );
// const handleRequest = async (method, url, token, data) => {
//   try {
//     const requestOptions = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       ...(data && { body: JSON.stringify(data) }),
//     };

//     const response = await axios[method](url, data, requestOptions);

//     if (
//       response.status === 201 ||
//       response.status === 202 ||
//       response.status === 200
//     ) {
//       console.log(response.data);
//       return response.data;
//     } else {
//       console.error("Erreur lors de la requête :", response.status);
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

// PARKING SPACES API ENDPOINTS
// export const getAllParkingSpaces = async (token) => {
//   return handleRequest("get", API_ENDPOINTS.PARKING_SPACES, token);
// };

// export const createParkingSpace = async (token, parkingSpace) => {
//   return handleRequest(
//     "post",
//     API_ENDPOINTS.PARKING_SPACES,
//     token,
//     parkingSpace
//   );
// };

// export const updateParkingSpace = async (token, id, parkingSpace) => {
//   return handleRequest(
//     "put",
//     API_ENDPOINTS.PARKING_SPACE_BY_ID + id,
//     token,
//     parkingSpace
//   );
// };

// export const deleteParkingSpace = async (token, id) => {
//   return handleRequest("delete", API_ENDPOINTS.PARKING_SPACE_BY_ID + id, token);
// };

// // USERS API ENDPOINTS
// export const getAllUsers = async (token) => {
//   return handleRequest("get", API_ENDPOINTS.USERS, token);
// };

// export const getUserById = async (token, id) => {
//   return handleRequest("get", API_ENDPOINTS.USER_BY_ID + id, token);
// };

// export const updateUser = async (token, id, user) => {
//   return handleRequest("patch", API_ENDPOINTS.USER_BY_ID + id, token, user);
// };

// export const deleteUser = async (token, id) => {
//   return handleRequest("delete", API_ENDPOINTS.USER_BY_ID + id, token);
// };
// // ASSIGNMENTS API ENDPOINTS
// export const getAllAssignments = async (token) => {
//   return handleRequest("get", API_ENDPOINTS.ASSIGNMENTS, token);
// };

// export const getAssignmentById = async (token, id) => {
//   return handleRequest("get", API_ENDPOINTS.ASSIGNMENT_BY_ID + id, token);
// };

// export const addAssignment = async (token, assignment) => {
//   return handleRequest("post", API_ENDPOINTS.ASSIGNMENTS, token, assignment);
// };

// export const deleteAssignment = async (token, id) => {
//   return handleRequest("delete", API_ENDPOINTS.ASSIGNMENT_BY_ID + id, token);
// };

// // CARS API ENDPOINTS
// export const getAllCars = async (token) => {
//   return handleRequest("get", API_ENDPOINTS.CARS, token);
// };

// export const getCarById = async (token, id) => {
//   return handleRequest("get", API_ENDPOINTS.CAR_BY_ID + id, token);
// };



export const getAllParkingSpaces = async (token) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      API_ENDPOINTS.PARKING_SPACES,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const getAllParkingSpacesAvailable = async (token) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      API_ENDPOINTS.PARKING_SPACES_AVAILABLE,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const createParkingSpace = async (token, parkingSpace) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      API_ENDPOINTS.PARKING_SPACES,
      parkingSpace,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const updateParkingSpace = async (token, id, parkingSpace) => {
  try {
    console.log(id, parkingSpace);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(
      API_ENDPOINTS.PARKING_SPACE_BY_ID + id,
      parkingSpace,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error(
        "Erreur lors de la mise à jour de la place de parking :",
        response.status
      );
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};

export const deleteParkingSpace = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      API_ENDPOINTS.PARKING_SPACE_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 204 || // Changed to check for 204 No Content status
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error(
        "Erreur lors de la suppression de la place de parking :",
        response.status
      );
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};

// USERS API ENDPOINTS
export const getAllUsers = async (token) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_ENDPOINTS.USERS, requestOptions);

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.log("No response received:", error.request);
      return error.request;
    } else {
      console.log("Error creating request:", error.message);
      return error.message;
    }
  }

};
export const getUserById = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      API_ENDPOINTS.USER_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const updateUser = async (token, id, user) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(
      API_ENDPOINTS.USER_BY_ID + id,
      user, 
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error(
        "Erreur lors de la mise à jour de l'utilisateur :",
        response.status
      );
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};

export const deleteUser = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      API_ENDPOINTS.USER_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 204
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
//ASSGNMENT API ENDPOINTS
export const getAllAssignments = async (token) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_ENDPOINTS.ASSIGNMENTS, requestOptions);

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log("Assignments :", response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const getAssignmentById = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      API_ENDPOINTS.ASSIGNMENT_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log("Assignments :", response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const addAssignment = async (token, assignment) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     
    };

    const response = await axios.post(
      API_ENDPOINTS.ASSIGNMENTS,
      assignment,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
export const deleteAssignment = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      API_ENDPOINTS.ASSIGNMENT_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 204
    ) {
      console.log("Assignments :", response.data);
      return response;
    } else {
      console.error("Erreur lors de l'enregistrement :", response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }
  }
};
//CARSAPI ENDPOINTS
export const getAllCars = async (token) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(API_ENDPOINTS.CARS, requestOptions);

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log("Cars :", response.data);
      return response.data;
    } else {
      console.error(
        "Erreur lors de la récupération des voitures :",
        response.status
      );
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }

    return null;
  }
};
export const getCarById = async (token, id) => {
  try {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      API_ENDPOINTS.CAR_BY_ID + id,
      requestOptions
    );

    if (
      response.status === 201 ||
      response.status === 202 ||
      response.status === 200
    ) {
      console.log("Car :", response.data);
      return response.data;
    } else {
      console.error(
        "Erreur lors de la récupération de la voiture :",
        response.status
      );
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.log("Server responded with status code:", error.response.status);
      console.log("Response data:", error.response.data);
    } else if (error.request) {
      console.log("No response received:", error.request);
    } else {
      console.log("Error creating request:", error.message);
    }

    return null;
  }
};
