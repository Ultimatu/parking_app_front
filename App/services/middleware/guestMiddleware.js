import authStore from "../auth/auth.store";

export const guestMiddleware = (navigation) => {
  return () => {
    if (authStore.isAuthenticated()) {
      console.log("authed");
      const role = authStore.getRole();
      if (role === "customer") {
        navigation.navigate("CustomerLayout");
      } else if (role === "admin") {
      }
      return false;
    } else {
      console.log("here");
      return true;
    }
  };
};
