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
import { useEffect, useState } from "react";
import SPACING from "../../config/SPACING";
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/Restaurant/colors";
import { RECIPE_LOGO } from "../../assets/logo";
import { GPT_API } from "../../api_key";
import GPTLoadingScreen from "./GPTLoadingScreen";
import axios from "axios";

const RecipeDetailScreen = ({ route, navigation }) => {
  const { menu } = route.params;

  const [loading, setLoading] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState([]);

  useEffect(() => {
    search2();
  }, []);

  const api_key = GPT_API;
  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    },
  };

  const search2 = async () => {
    setLoading(true);
    const recipe = menu.name;
    const ingredient = menu.ingredient;
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "자 이제" +
          recipe +
          " 레시피를 알려줘. 가지고 있는 재료는" +
          ingredient +
          '인데, 모든 재료를 사용하지 않아도 돼. 출력 형식은 "[재료]:~, [레시피]: 1. 2. 3. " 이렇게 해 줘. 대답할 때 첫 시작은 무조건 "[재료]:~"로 해주고, "[재료]:~ [레시피]: 1. 2. 3. " 형식으로 된 내용 이외의 다른 문장은 절대로 출력하지마',
      },
    ];
    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: messages,
    };
    try {
      const response = (
        await axios.post(
          "https://api.openai.com/v1/chat/completions",
          data,
          config
        )
      ).data.choices[0].message.content;
      setRecipeDetail(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  console.log(recipeDetail);
  const ingredientStartIndex = recipeDetail.indexOf("[재료]");
  const ingredientEndIndex = recipeDetail.indexOf("[레시피]");

  const recipeStartIndex = recipeDetail.indexOf("[레시피]");
  const recipeEndIndex = recipeDetail.length;

  let filteredText = recipeDetail;
  let ingredientText = "";
  let recipeText = "";

  if (ingredientStartIndex > -1 && ingredientEndIndex > -1) {
    ingredientText = recipeDetail.slice(
      ingredientStartIndex + 4,
      ingredientEndIndex
    );
    filteredText = filteredText.replace(ingredientText, "");
  }

  if (recipeStartIndex > -1 && recipeEndIndex > -1) {
    recipeText = recipeDetail.slice(recipeStartIndex + 5, recipeEndIndex);
    filteredText = filteredText.replace(recipeText, "");
  }

  const arrIngredientText = ingredientText.replace(": ", "").split(", ");
  const arrRecipeText = recipeText.replace(/^:/, "").split(/\s+\d+\.\s+/);
  const newArrRecipeText = arrRecipeText.slice(1);
  console.log(arrIngredientText);
  console.log(arrRecipeText);

  const pressHandler = () => {
    navigation.goBack(); // 이전 화면으로 이동
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
      {loading ? (
        <GPTLoadingScreen />
      ) : (
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
              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderBottomColor: colors.list,
                    borderBottomWidth: SPACING * 0.2,
                    padding: SPACING * 0.6,
                    marginHorizontal: SPACING * 1.2,
                    marginVertical: SPACING * 0.4,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SPACING * 1.8,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    재료
                  </Text>
                </View>
                {arrIngredientText.map((dataPoint) => (
                  <View
                    key={dataPoint}
                    style={{
                      backgroundColor: colors.white,
                      borderWidth: SPACING * 0.2,
                      borderColor: colors.listBorder,
                      borderRadius: SPACING * 0.6,
                      padding: SPACING,
                      paddingHorizontal: SPACING * 0.8,
                      paddingVertical: SPACING * 0.4,
                      marginVertical: SPACING * 0.4,
                      marginHorizontal: SPACING * 1.2,
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {dataPoint.replace(/\n/g, "")}
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    borderBottomColor: colors.list,
                    borderBottomWidth: SPACING * 0.2,
                    padding: SPACING * 0.6,
                    marginHorizontal: SPACING * 1.2,
                    marginVertical: SPACING * 0.4,
                    width: "90%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: SPACING * 1.8,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    레시피
                  </Text>
                </View>
                {newArrRecipeText.map((dataPoint) => (
                  <View
                    key={dataPoint}
                    style={{
                      backgroundColor: colors.white,
                      borderWidth: SPACING * 0.2,
                      borderColor: colors.listBorder,
                      borderRadius: SPACING * 0.6,
                      padding: SPACING,
                      paddingHorizontal: SPACING * 0.8,
                      paddingVertical: SPACING * 0.4,
                      marginVertical: SPACING * 0.4,
                      marginHorizontal: SPACING * 1.2,
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>
                      {dataPoint.replace(/\n/g, "")}
                    </Text>
                  </View>
                ))}
              </View>
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
      )}
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
