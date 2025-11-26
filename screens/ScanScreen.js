import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/colors';
import geminiService from '../services/geminiService';

const { width } = Dimensions.get('window');

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
    if (!result.canceled) setImage(result.assets[0]);
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
    if (!result.canceled) setImage(result.assets[0]);
  };

  const handlePressImageArea = () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select or take a photo first');
      return;
    }

    setLoading(true);
    navigation.navigate('Analysis', { image: image.uri });

    try {
      const result = await geminiService.analyzeFood(image.base64);
      setLoading(false);
      navigation.replace('Score', { analysisData: result, image: image.uri });
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
      const fallbackData = geminiService.getFakeData();
      fallbackData.then(data => {
        navigation.replace('Score', { analysisData: data, image: image.uri });
      });
    }
  };

  return (
    <View style={styles.container}>

      {/* Верхняя зелёная зона */}
      <View style={styles.topArea}>
        <TouchableOpacity style={styles.imageArea} onPress={handlePressImageArea}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Tap to select or scan photo</Text>
          )}
        </TouchableOpacity>

        {image && (
          <TouchableOpacity style={styles.analyzeButton} onPress={analyzeImage} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.analyzeButtonText}>Analyze</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Нижняя белая панель */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={34} color={colors.primary} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Analysis')}>
          <MaterialIcons name="psychology" size={34} color={colors.primary} />
          <Text style={styles.navLabel}>AI Explain</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('History')}>
          <MaterialIcons name="history" size={34} color={colors.primary} />
          <Text style={styles.navLabel}>History</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },

  topArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageArea: {
    width: width * 0.85,
    height: width * 1.2,   // ← УДЛИНИЛ
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover'
  },

  imagePlaceholder: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },

  analyzeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },

  analyzeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  bottomNav: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 8,
  },

  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  navLabel: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});

export default ScanScreen;
