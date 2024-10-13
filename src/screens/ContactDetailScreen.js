import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ContactDetailsScreen = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.role}>{contact.role}</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Save to phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Share contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  name: { fontSize: 28, fontWeight: "bold" },
  role: { fontSize: 18, color: "gray" },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});

export default ContactDetailsScreen;
