import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function ProfileLock() {
  const screenHeight = Dimensions.get("window").height / 2; // Half of the screen height

  return (
    <View style={[styles.lockScreenContainer, { paddingBottom: screenHeight }]}>
      <View style={styles.lockScreenContent}>
        <MaterialIcons
          name="lock"
          size={48}
          color="#6c757d"
          style={styles.lockIcon}
        />
        <Text style={styles.lockText}>Profile is Locked</Text>
        <Text style={styles.lockMessage}>
          This profile is private. You need to be friends to see the content.
          lore
        </Text>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  lockScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff", // White background
  },
  lockScreenContent: {
    maxWidth: 400,
    alignItems: "center",
  },
  lockIcon: {
    marginBottom: 16,
  },
  lockText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40", // Dark text color
    marginBottom: 8,
  },
  lockMessage: {
    fontSize: 16,
    color: "#6c757d", // Gray text color
    textAlign: "center",
  },
});

export default ProfileLock;