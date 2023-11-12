import authStore from "../auth/auth.store";

export const roleMiddleware = (setRole) => {
  authStore
    .getRole().then((response) => {
      setRole(response);
    }
    ).catch((error) => {
      setRole(null);
    }
    );
};
