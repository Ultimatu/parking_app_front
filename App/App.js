import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AdminLayout from "./screens/admin/AdminLayout";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import WelcomeView from "./components/WelcomeView";
import Dashboard from "./screens/customer/Dashboard";
import { authMiddleware } from "./services/middleware/authMiddlware";
import { roleMiddleware } from "./services/middleware/roleMiddleware";
import Splash from "./screens/Splash";

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState(null);


  React.useEffect(() => {
    authMiddleware(setIsAuthenticated, setUser);
    roleMiddleware(setRole);

  }, []);

  
  

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} 
          >
              <Stack.Screen name="splash" component={Splash} />
              <>
                  <Stack.Screen name="AdminLayout" component={AdminLayout} />

                  <Stack.Screen name="CustomerLayout" component={Dashboard} />
              </>
              <Stack.Screen
                  name="Welcome"
                  component={WelcomeView}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="Login"
                  component={LoginView}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="Register"
                  component={RegisterView}
                  options={{ headerShown: false }}
              />
          </Stack.Navigator>
      </NavigationContainer>
  );
  
};

export default App;
