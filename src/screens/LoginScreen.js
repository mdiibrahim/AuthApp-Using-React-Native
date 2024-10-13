import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace("Contacts");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.replace("Contacts");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        throw new Error("User cancelled the login process");
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error("Something went wrong obtaining access token");
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      await auth().signInWithCredential(facebookCredential);
      navigation.replace("Contacts");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to your account</Text>
      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={loginWithEmail}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or, Log in with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity onPress={loginWithGoogle}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={loginWithFacebook}>
          <Image
            source={require("../../assets/facebook.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: { color: "white", fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 10 },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: { width: 40, height: 40, marginHorizontal: 10 },
});

export default LoginScreen;
