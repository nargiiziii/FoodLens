import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';
import RiskBadge from '../components/RiskBadge';

const ScoreScreen = ({ route, navigation }) => {
  const { analysisData, image } = route.params;

  const getRiskColor = (score) => {
    if (score <= 30) return colors.success;
    if (score <= 60) return colors.warning;
    return colors.danger;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.productName}>{analysisData.productName}</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Risk Score</Text>
          <View style={styles.scoreCircle}>
            <Text 
              style={[
                styles.scoreValue, 
                { color: getRiskColor(analysisData.overallRiskScore) }
              ]}
            >
              {analysisData.overallRiskScore}
            </Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
          <RiskBadge risk={analysisData.riskLevel} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{analysisData.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ingredients ({analysisData.ingredients.length})
          </Text>
          {analysisData.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientCard}>
              <View style={styles.ingredientHeader}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                {ingredient.eCode && (
                  <Text style={styles.eCode}>{ingredient.eCode}</Text>
                )}
              </View>
              <Text style={styles.ingredientExplanation}>
                {ingredient.explanation}
              </Text>
              <RiskBadge risk={ingredient.risk} />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Recommendation', { analysisData })}
        >
          <Text style={styles.buttonText}>View Recommendations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    height: 200,
    backgroundColor: colors.white
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  content: {
    padding: 20
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center'
  },
  scoreContainer: {
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16
  },
  scoreCircle: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: 'bold'
  },
  scoreMax: {
    fontSize: 24,
    color: colors.textSecondary,
    marginLeft: 4
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12
  },
  summaryText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12
  },
  ingredientCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  ingredientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1
  },
  eCode: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  ingredientExplanation: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ScoreScreen;