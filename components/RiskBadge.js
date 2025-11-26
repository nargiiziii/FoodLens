import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const RiskBadge = ({ risk }) => {
  const getBadgeColor = () => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return colors.success;
      case 'medium':
        return colors.warning;
      case 'high':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
      <Text style={styles.badgeText}>{risk || 'Unknown'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
  badgeText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12
  }
});

export default RiskBadge;