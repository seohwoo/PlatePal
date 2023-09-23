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
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import DATA from "../../config/Restaurant/DATA";
const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const pressHandler = () => {
    navigation.navigate("Welcome");
  };
  return (
    <SafeAreaView>
      <ScrollView>
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
              <AntDesign name="left" size={SPACING * 2.5} color={colors.gray} />
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
              <AntDesign name="home" size={SPACING * 2.5} color={colors.gray} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", marginTop: SPACING * 2 }}>
            <Text style={{ fontSize: SPACING * 3, fontWeight: "700" }}>
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
            <TouchableOpacity>
              <Ionicons
                name="search"
                color={colors.gray}
                size={SPACING * 2.7}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Want to .."
              placeholderTextColor={colors.gray}
              style={{
                color: colors.gray,
                fontSize: SPACING * 2,
                marginLeft: SPACING,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.blue,
              padding: SPACING * 1.5,
              marginHorizontal: SPACING * 1.6,
              borderRadius: SPACING * 2,
              flexDirection: "row",
              justifyContent: "center",
            }}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
