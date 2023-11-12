export const BASE_URL = "https://p01--parkingstation--49bmcf7tn9fz.code.run/api";

// API Endpoints
export const API_ENDPOINTS = {
    // Login
    LOGIN: BASE_URL + "/auth/authenticate",
    //Signup
    SIGNUP: BASE_URL + "/auth/register",

    //Users
    USERS: BASE_URL + "/users",
    USER_BY_ID: BASE_URL + "/users/",

    //Parking Spaces
    PARKING_SPACES: BASE_URL + "/admin/parkingspaces",
    PARKING_SPACE_BY_ID: BASE_URL + "/admin/parkingspaces/",
    PARKING_SPACES_AVAILABLE: BASE_URL + "/admin/parkingspaces/available",
    PARKING_SPACES_UNAVAILABLE: BASE_URL + "/admin/parkingspaces/unavailable",

    //Assignments
    ASSIGNMENTS: BASE_URL + "/assignments",
    ASSIGNMENT_BY_ID: BASE_URL + "/assignments/",
    ASSIGNMENT_BY_USER_ID: BASE_URL + "/assignments/my-parkings/",

    //Cars
    CARS: BASE_URL + "/cars",
    CAR_BY_ID: BASE_URL + "/cars/",
    CAR_BY_USER_ID: BASE_URL + "/cars/user/",

    //USER
    PROFILE: BASE_URL + "/user/",

}

