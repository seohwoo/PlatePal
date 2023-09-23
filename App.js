import React from "react";
import RecipeDetailScreen from "./Screen/Restaurant/RecipeDetailScreen";
import DATA from "./config/Restaurant/DATA";
import HomeScreen from "./Screen/Restaurant/HomeScreen";
import WelcomeScreen from "./Screen/Restaurant/WelcomeScreen";
const App = () => {
  return <WelcomeScreen />;

  //<HomeScreen />
  //<RecipeDetailScreen recipe={DATA[0].recipes[1]} />
};

export default App;
