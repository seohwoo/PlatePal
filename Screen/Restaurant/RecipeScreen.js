import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const RecipeScreen = ({ route }) => {
  const { menu } = route.params; // 메뉴 정보 받아오기

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/restaurant/nadine-primeau--ftWfohtjNw-unsplash.jpeg")}
        style={styles.menuImage}
        resizeMode="cover"
      />
      <Text style={styles.menuName}>메뉴 이름: {menu.name}</Text>
      <Text style={styles.ingredients}>재료 정보: {menu.ingredients}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    paddingTop: 15,
  },
  menuImage: {
    width: "100%",
    height: "60%",
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  ingredients: {
    fontSize: 16,
  },
});

export default RecipeScreen;
