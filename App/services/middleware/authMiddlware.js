import authStore from "../auth/auth.store";

export const authMiddleware = (setIsAuthenticated, setUser) => {
  authStore
    .isAuthenticated().then((response) => {
      setIsAuthenticated(response);
      setUser(authStore.getUser());
    }
    ).catch((error) => {
      setIsAuthenticated(false);
      setUser(null);
    }
    );
};
