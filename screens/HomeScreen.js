import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../constants/colors';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔍 FoodLens</Text>
        <Text style={styles.tagline}>AI-powered food scanner with risk analysis</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📱</Text>
        </View>
        
        <Text style={styles.title}>Scan Products Smart</Text>
        <Text style={styles.description}>
          Understand food additives and E-codes instantly. Make informed and healthy purchasing decisions.
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📷</Text>
            <Text style={styles.featureText}>Camera Scan</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureText}>AI Analysis</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>⚠️</Text>
            <Text style={styles.featureText}>Risk Score</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scan')}
      >
        <Text style={styles.scanButtonText}>Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  header: {
    marginTop: 60,
    alignItems: 'center'
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  icon: {
    fontSize: 60
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20
  },
  feature: {
    alignItems: 'center',
    flex: 1
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8
  },
  featureText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  scanButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default HomeScreen;