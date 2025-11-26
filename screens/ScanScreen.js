import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import colors from '../constants/colors';
import geminiService from '../services/geminiService';

const ScanScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    if (hasPermission === false) {
      Alert.alert('Permission Denied', 'Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select or take a photo first');
      return;
    }

    setLoading(true);
    navigation.navigate('Analysis', { image: image.uri });

    try {
      // Пытаемся использовать API, но если не работает - вернутся фейковые данные
      const result = await geminiService.analyzeFood(image.base64);
      
      setLoading(false);
      navigation.replace('Score', { 
        analysisData: result,
        image: image.uri 
      });
    } catch (error) {
      // Этот catch теперь не должен срабатывать, так как geminiService сам вернет фейковые данные
      console.error('Unexpected error:', error);
      setLoading(false);
      
      // На всякий случай - если совсем все плохо
      const fallbackData = geminiService.getFakeData();
      fallbackData.then(data => {
        navigation.replace('Score', { 
          analysisData: data,
          image: image.uri 
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Scan Product</Text>
      </View>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>No image selected</Text>
            <Text style={styles.placeholderSubtext}>
              Demo mode: Will show sample results
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cameraButton]}
          onPress={takePhoto}
        >
          <Text style={styles.buttonText}>📷 Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.galleryButton]}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
        </TouchableOpacity>

        {image && (
          <TouchableOpacity 
            style={[styles.button, styles.analyzeButton]}
            onPress={analyzeImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>🔍 Analyze Product</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.demoNote}>
        <Text style={styles.demoNoteText}>
          💡 Demo Mode: If API is not configured, sample data will be displayed
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.white
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text
  },
  imageContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8
  },
  placeholderSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  buttonContainer: {
    padding: 20
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12
  },
  cameraButton: {
    backgroundColor: colors.secondary
  },
  galleryButton: {
    backgroundColor: colors.textSecondary
  },
  analyzeButton: {
    backgroundColor: colors.primary,
    marginTop: 8
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  demoNote: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107'
  },
  demoNoteText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center'
  }
});

export default ScanScreen;