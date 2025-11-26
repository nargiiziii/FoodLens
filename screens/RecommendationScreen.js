import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";

const RecommendationScreen = ({ route, navigation }) => {
  const { analysisData } = route.params;

  const getRecommendationIcon = () => {
    const score = analysisData.overallRiskScore;
    if (score <= 30) return "✅";
    if (score <= 60) return "⚠️";
    return "🚫";
  };

  const getRecommendationTitle = () => {
    const score = analysisData.overallRiskScore;
    if (score <= 30) return "Safe to Consume";
    if (score <= 60) return "Consume with Caution";
    return "Consider Alternatives";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{getRecommendationIcon()}</Text>
        <Text style={styles.title}>{getRecommendationTitle()}</Text>
        <Text style={styles.subtitle}>
          Based on AI analysis of ingredients and additives
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Our Recommendations</Text>
          {analysisData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 What does this mean?</Text>
          <Text style={styles.infoText}>
            This risk assessment is based on scientific research about food
            additives and their potential health effects. Always consult with
            healthcare professionals for personalized dietary advice.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Scan Another Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>View Details Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 40,
    alignItems: "center",
    paddingTop: 80,
  },
  icon: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bulletPoint: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  bulletText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  recommendationText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  infoBox: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default RecommendationScreen;
