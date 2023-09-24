import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import React from "react";

import SPACING from "../../config/SPACING";
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/Restaurant/colors";
import { RECIPE_LOGO } from "../../assets/logo";

const RecipeDetailScreen = ({ route, navigation }) => {
  const { menu } = route.params;
  const pressHandler = () => {
    navigation.navigate("MenuList");
  };
  const pressHandlerWelcome = () => {
    navigation.navigate("Welcome");
  };

  const handleRecipePress = (text) => {
    const url = `https://www.10000recipe.com/recipe/list.html?q=${menu.name}`;
    Linking.openURL(url);
  };

  return (
    <>
      <ScrollView>
        <ImageBackground
          style={{
            padding: SPACING * 2,
            height: height / 2.5,
            padding: SPACING * 2,
            paddingTop: SPACING * 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          source={{ uri: menu.image }}
        >
          <TouchableOpacity
            style={{
              height: SPACING * 4.5,
              width: SPACING * 4.5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SPACING * 2.5,
            }}
            onPress={pressHandler}
          >
            <Ionicons
              name="arrow-back"
              size={SPACING * 2.5}
              color={colors.gray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: SPACING * 4.5,
              width: SPACING * 4.5,
              backgroundColor: colors.white,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SPACING * 2.5,
            }}
            onPress={pressHandlerWelcome}
          >
            <Ionicons
              name="home-outline"
              size={SPACING * 2.5}
              color={colors.gray}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <View
            style={{
              padding: SPACING * 2,
              paddingTop: SPACING * 3,
              marginTop: -SPACING * 3,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                paddingRight: SPACING,
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: SPACING * 3,
                    color: colors.black,
                    fontWeight: "700",
                  }}
                >
                  {menu.name}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: SPACING * 2,
                paddingLeft: SPACING,
                paddingRight: SPACING,
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="time"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  15 min
                </Text>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    padding: SPACING,
                    paddingHorizontal: SPACING * 3,
                    backgroundColor: colors.yellow,
                    flexDirection: "row",
                    borderRadius: SPACING,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="star"
                    color={colors.black}
                    size={SPACING * 1.7}
                  />
                  <Text
                    style={{
                      fontSize: SPACING * 1.6,
                      fontWeight: "600",
                      marginLeft: SPACING / 2,
                      color: colors.black,
                    }}
                  >
                    share
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bicycle"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  8 min
                </Text>
              </View> */}
              {/* <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="restaurant"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  4 min
                </Text>
              </View> */}
            </View>
            {/* <View style={{ marginVertical: SPACING * 3 }}>
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "700",
                  color: colors.dark,
                }}
              >
                Ingredients
              </Text>
              {recipe.ingredients.map((ingredient) => (
                <View
                  style={{
                    marginVertical: SPACING,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={ingredient.id}
                >
                  <View
                    style={{
                      width: SPACING,
                      height: SPACING,
                      backgroundColor: colors.light,
                      borderRadius: SPACING,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: SPACING * 1.7,
                      fontWeight: "600",
                      color: colors.gray,
                      marginLeft: SPACING,
                    }}
                  >
                    {ingredient.title}
                  </Text>
                </View>
              ))}
            </View> */}
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 1.7,
                fontWeight: "500",
                color: colors.gray,
              }}
            >
              Id amet veniam nisi esse ea. Ex est ut cupidatat sint culpa
              commodo exercitation est magna proident officia laboris.
              Exercitation laboris ex laborum qui mollit et occaecat deserunt
              incididunt. Mollit excepteur sunt adipisicing ullamco excepteur
              non ex proident. Irure laborum enim do fugiat aute amet eu quis
              amet tempor.
            </Text>
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 1.7,
                fontWeight: "500",
                color: colors.gray,
              }}
            >
              Id amet veniam nisi esse ea. Ex est ut cupidatat sint culpa
              commodo exercitation est magna proident officia laboris.
              Exercitation laboris ex laborum qui mollit et occaecat deserunt
              incididunt. Mollit excepteur sunt adipisicing ullamco excepteur
              non ex proident. Irure laborum enim do fugiat aute amet eu quis
              amet tempor.
            </Text>
          </View>
        </View>
        {/*  */}
        <View style={{ padding: SPACING * 2, backgroundColor: colors.white }}>
          <TouchableOpacity
            style={{
              width: "100%",
              padding: SPACING,
              backgroundColor: colors.black,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SPACING * 3,
            }}
            onPress={handleRecipePress}
          >
            <Image
              source={{ uri: RECIPE_LOGO }}
              style={{
                width: SPACING * 4,
                height: SPACING * 4,
                marginRight: SPACING * 1.5,
                marginLeft: SPACING * 0.5,
                borderRadius: SPACING * 5,
              }}
            />
            <Text
              style={{
                fontSize: SPACING * 2,
                color: colors.white,
                fontWeight: "700",
              }}
            >
              More Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
