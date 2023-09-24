import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import GPTLoadingScreen from "./GPTLoadingScreen";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const pressHandler = () => {
    navigation.navigate("Welcome");
  };
  const [enterValue, setEnterValue] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [loading, setLoading] = useState(false);

  const MenuNameGPT = async () => {
    if (ingredient.length < 1) {
      Alert.alert("재료를 1개 이상 추가해주세요");
    } else {
      try {
        setLoading(true);
        const menuName = await fetchMenuName(ingredient);
        console.log("MenuName:", menuName);
        setLoading(false);
        navigation.navigate("MenuList", { MenuList: menuName });
      } catch (error) {
        console.error("Error MenuName:", error);
        Alert.alert("메뉴 생성 중 오류가 발생했습니다.");
        setLoading(false);
      }
    }
  };

  const fetchMenuName = async (ingredients) => {
    try {
      const api_key = "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";
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `재료:' + ${ingredients.join(
            ", "
          )} + 'if 재료가 모두 음식이라면 재료를 포함해서 만들 수 있는 요리 이름을 한단어로 말해주고, 필요한 재료들을 알려줘. 이 때 만드는 방법은 말하지 마. 출력형식은 " 숫자. 메뉴이름 : 재료"이고, 개수는 4개 이하로 생성해줘. 생성 후에는 다른 문장은 출력하지마. else 재료가 음식이 아니라면 오류를 출력해줘. 오류 출력형식은 "정확한 재료를 입력해 주세요" 딱 이 한 문장이고, 다른 문장은 절대 출력하지마. (if, else 문에서 지시한 문장이 아니라면 어떠한 문장도 출력하지 마)`,
        },
      ];

      const data = {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        n: 1,
        messages: messages,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        data,
        {
          headers: {
            Authorization: `Bearer ${api_key}`,
            "Content-Type": "application/json",
          },
        }
      );

      const menuName = response.data.choices[0].message.content;
      return menuName;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const addIngredient = () => {
    if (enterValue.trim() === "") {
      Alert.alert("재료를 입력해주세요");
    } else if (ingredient.includes(enterValue)) {
      Alert.alert("이미 입력하신 재료입니다");
    } else {
      setIngredient([...ingredient, enterValue]);
      setEnterValue("");
    }
  };

  const deleteIngredient = (ing) => {
    setIngredient(ingredient.filter((item) => item !== ing));
  };

  const ingredientList = ingredient.map((ing, index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.ingredient,
        marginVertical: SPACING * 0.7,
        marginHorizontal: SPACING * 0.7,
        padding: SPACING,
        borderRadius: SPACING * 2,
      }}
    >
      <Text style={{ fontSize: SPACING * 2, color: colors.white }}>{ing}</Text>
      <TouchableOpacity
        style={{ marginLeft: SPACING }}
        onPress={() => deleteIngredient(ing)}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: SPACING * 2,
            color: colors.white,
          }}
        >
          x
        </Text>
      </TouchableOpacity>
    </View>
  ));
  return (
    <SafeAreaView style={{ backgroundColor: colors.theme, flex: 1 }}>
      <ScrollView>
        {loading ? (
          <GPTLoadingScreen />
        ) : (
          <View style={{ padding: SPACING * 2 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: SPACING * 2,
              }}
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
                <AntDesign
                  name="left"
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
                onPress={pressHandler}
              >
                <AntDesign
                  name="home"
                  size={SPACING * 2.5}
                  color={colors.gray}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", marginTop: SPACING * 5 }}>
              <Text
                style={{
                  fontSize: SPACING * 3,
                  fontWeight: "700",
                  color: colors.black,
                }}
              >
                Enter all the ingredients you have now
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.input,
                marginVertical: SPACING * 3,
                padding: SPACING * 1.5,
                borderRadius: SPACING,
              }}
            >
              <TouchableOpacity onPress={addIngredient}>
                <Ionicons
                  name="search"
                  color={colors.gray}
                  size={SPACING * 2.7}
                />
              </TouchableOpacity>
              <TextInput
                value={enterValue}
                onChangeText={(text) => setEnterValue(text)}
                placeholder="Want to .."
                placeholderTextColor={colors.gray}
                style={{
                  color: colors.gray,
                  fontSize: SPACING * 2,
                  marginLeft: SPACING,
                }}
                onSubmitEditing={addIngredient}
              />
            </View>
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
            >
              {ingredientList}
            </View>

            <LinearGradient colors={[colors.theme, colors.theme]}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.blue,
                  padding: SPACING * 1.5,
                  marginHorizontal: SPACING * 1.6,
                  borderRadius: SPACING * 3,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: SPACING * 2,
                }}
                onPress={MenuNameGPT}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: SPACING * 2,
                    fontWeight: "bold",
                    marginRight: SPACING * 7,
                    marginLeft: SPACING * 7,
                  }}
                >
                  Search Recipes
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={SPACING * 3}
                  color={colors.white}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
