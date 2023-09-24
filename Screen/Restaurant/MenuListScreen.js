import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import colors from "../../config/Restaurant/colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";

const MenuListScreen = ({ route, navigation }) => {
  const [menuList, setMenuList] = useState([]);
  const MenuName = route.params.MenuList;
  const pressHandler = () => {
    navigation.navigate("Welcome");
  };
  const pressHandlerHome = () => {
    navigation.navigate("Homee");
  };

  // 메뉴 이름 분리 함수
  const splitMenuName = (menuString) => {
    // 정규 표현식을 사용하여 메뉴 이름과 재료를 모두 추출
    const regex = /^[0-9]+\. (.+): (.+)$/gm;
    const matches = [];
    let match;

    while ((match = regex.exec(menuString))) {
      const [, name, ing] = match;
      matches.push({ name, ing });
    }

    return matches.length > 0 ? matches : null;
  };
  const menuInfo = splitMenuName(MenuName);

  useEffect(() => {
    // 메뉴 이름 분리
    const KAKAO_API_KEY = "4d531186b3bd2d6add236f3a6093fd18";
    if (menuInfo) {
      // 카카오 이미지 검색 API 호출
      const searchMenuImages = async () => {
        try {
          const menuImages = [];
          for (const menu of menuInfo) {
            // const response = await axios.get(
            //   `https://dapi.kakao.com/v2/search/image?query=${menu.name}`,
            //   {
            //     headers: {
            //       Authorization: `KakaoAK ${KAKAO_API_KEY}`,
            //     },
            //   }
            // );
            const imageData = {
              name: menu.name,
              //image: response.data.documents[0]?.image_url, // 첫 번째 이미지 URL 가져오기
              ingredients: menu.ing,
            };
            menuImages.push(imageData);
            //요청 후 1초 대기 (요청 간격 조절)
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
          setMenuList(menuImages);
        } catch (error) {
          console.error("Error fetching menu images:", error);
        }
      };

      // API 호출
      searchMenuImages();
    }
  }, [menuInfo]);

  return (
    <View style={styles.container}>
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
          onPress={pressHandlerHome}
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
      <View
        style={{ width: "100%", marginTop: SPACING * 3, paddingLeft: SPACING }}
      >
        <Text
          style={{
            fontSize: SPACING * 3,
            fontWeight: "700",
            color: colors.black,
            marginBottom: SPACING * 4,
          }}
        >
          It's a menu that can be made with current ingredients.
        </Text>
      </View>
      <FlatList
        data={menuList}
        keyExtractor={(item, index) => index.toString()}
        style={{ paddingLeft: SPACING }}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "#e0e0e0", height: 1 }} />
        )}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <TouchableOpacity>
              <View style={styles.menuInfo}>
                <Image
                  source={require("../../assets/pexels-william-choquette-2641886.jpeg")}
                  style={styles.menuImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.ingredients}>{item.ingredients}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    backgroundColor: colors.theme,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: SPACING,
    marginTop: SPACING,
  },
  menuInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: SPACING * 2,
  },
  textContainer: {
    flexDirection: "column",
  },
  menuName: {
    fontSize: SPACING * 2,
    fontWeight: "bold",
    color: colors.dark,
  },
  ingredients: {
    fontSize: SPACING * 1.5,
    color: colors.dark,
  },
});

export default MenuListScreen;
