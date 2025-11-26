import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import colors from "../constants/colors";

const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Верхняя часть зеленая */}
      <View style={styles.topBackground} />

      {/* Белый блок с логотипом и изображением */}
      <View style={styles.whiteBlock}>
        <Text style={styles.logo}>FoodLens</Text>
        <Image
          source={require("../assets/images/salad.png")} // путь к твоему изображению
          style={styles.logoImage}
        />
      </View>

      {/* Контент */}
      <View style={styles.centerContent}>
        <Text style={styles.subtitle}>
          Know what you <Text style={styles.subtitleGreen}>eat</Text>
        </Text>

        <Text style={styles.description}>
          People don't understand additives and E code
        </Text>
      </View>

      {/* Кнопка Explore */}
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.exploreButtonText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  topBackground: {
    width: "100%",
    height: height / 6, // зеленая часть
    backgroundColor: "green",
  },
  whiteBlock: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 60, // закругления белого блока
    alignItems: "center",
    marginTop: -90, // перекрываем зеленую часть
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logo: {
    fontSize: 68,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 0,
  },
  logoImage: {
    width: 300,
    height: 300,
    borderRadius: 150, // круглое изображение
    borderWidth: 2,
    borderColor: "#fff",
  },
  centerContent: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 64,
    fontWeight: "500",
    color: "#000",
    textAlign: "start",
    marginLeft: 20,
  },
  subtitleGreen: {
    color: "green",
  },
  description: {
    fontSize: 20,
    color: "#000",
    textAlign: "start",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  exploreButton: {
    position: "absolute",
    bottom: 70,
    backgroundColor: "green",
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 25,
    alignItems: "center",
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default HomeScreen;
