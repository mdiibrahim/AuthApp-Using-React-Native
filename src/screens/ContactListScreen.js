import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const dummyContacts = Array(10).fill({
  name: "Ashpak Tamboli",
  role: "Full Stack Developer, Superlocalfans",
});

const ContactsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={dummyContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactDetails", { contact: item })
            }
          >
            <View style={styles.contactItem}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  contactItem: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  name: { fontWeight: "bold" },
  role: { color: "gray" },
});

export default ContactsScreen;
