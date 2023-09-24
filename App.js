import { StatusBar } from "expo-status-bar";
import React from "react";
import RecipeDetailScreen from "./Screen/Restaurant/RecipeDetailScreen";
import DATA from "./config/Restaurant/DATA";
import HomeScreen from "./Screen/Restaurant/HomeScreen";
import WelcomeScreen from "./Screen/Restaurant/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuListScreen from "./Screen/Restaurant/MenuListScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MenuList"
            component={MenuListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );

  //<HomeScreen />
  //<RecipeDetailScreen recipe={DATA[0].recipes[1]} />
};

export default App;
