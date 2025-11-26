import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const AnalysisScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.scanLine} />
        </View>
      </View>

      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.title}>Analyzing Product...</Text>
        <Text style={styles.subtitle}>AI is reading ingredients and E-codes</Text>
        
        <View style={styles.steps}>
          <View style={styles.step}>
            <Text style={styles.stepIcon}>✓</Text>
            <Text style={styles.stepText}>Image processed</Text>
          </View>
          <View style={styles.step}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.stepText}>Analyzing ingredients</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepIconInactive}>○</Text>
            <Text style={styles.stepTextInactive}>Calculating risk</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  imageContainer: {
    height: 300,
    backgroundColor: colors.white,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.7
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanLine: {
    width: '80%',
    height: 2,
    backgroundColor: colors.primary
  },
  content: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 20,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40
  },
  steps: {
    width: '100%',
    marginTop: 20
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  stepIcon: {
    fontSize: 20,
    color: colors.success,
    marginRight: 12,
    width: 24,
    textAlign: 'center'
  },
  stepIconInactive: {
    fontSize: 20,
    color: colors.border,
    marginRight: 12,
    width: 24,
    textAlign: 'center'
  },
  stepText: {
    fontSize: 16,
    color: colors.text
  },
  stepTextInactive: {
    fontSize: 16,
    color: colors.textSecondary
  }
});

export default AnalysisScreen;