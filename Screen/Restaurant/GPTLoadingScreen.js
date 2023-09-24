import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function GPTLoadingScreen() {
  return (
    <LinearGradient
      colors={["rgba(95, 208, 120, 0)", "rgba(95, 208, 120, 0.2)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
          source={require("./animation/96898-loader-animation.json")}
          autoPlay
          loop
          speed={1.5}
        />
      </View>
      <Text style={styles.LoadingText}>Loading...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    overflow: "hidden",
    borderColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  container: {
    zIndex: 1,
  },
  LoadingText: {
    marginTop: 200,
    fontSize: 25,
    fontWeight: "600",
    color: "#30cb90",
  },
});
