import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>CHOFF</Text>
        <Text style={styles.subHeadingText}>Your Daily Brew Companion</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Email Address</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}>Password</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter password"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {password.length > 0 && password.length < 6 ? (
          <Text style={styles.warningText}>Password must be longer than 5 characters</Text>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Log In" onPress={() => console.log("Logging in...")} color="peru" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "blanchedalmond",
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  headingText: {
    fontSize: 65,
    fontWeight: "bold",
    color: "saddlebrown",
    letterSpacing: 3,
  },
  subHeadingText: {
    fontSize: 18,
    color: "sienna",
    marginTop: 4,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputBox: {
    borderColor: "black",
    borderWidth: 2,
    fontSize: 18,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "oldlace",
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  warningText: {
    fontSize: 15,
    color: "red",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 80,
  },
});

export default LogInScreen;
