import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../config/Restaurant/colors";

const LoadingScreen = () => {
  const animationRef = useRef(null);

  // 화면이 처음으로 표시될 때 애니메이션을 초기화하고 재생
  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("./animation/animation_lmytmmga.json")}
        autoPlay={false}
        loop={true}
        speed={1.3}
        style={styles.animation}
      />
      <Text style={styles.text}>GPT가 메뉴를 생성중입니다...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 300, // 원하는 크기로 조절하세요.
    height: 300,
  },
  text: {
    marginTop: 16, // 텍스트와 애니메이션 사이의 간격 조절
    fontSize: 18, // 원하는 텍스트 크기 설정
    fontWeight: "bold", // 원하는 텍스트 스타일 설정
    color: colors.gray,
  },
});

export default LoadingScreen;
