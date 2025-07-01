import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Email Address</Text>
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
        <Text style={styles.title}>Password</Text>
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
        <Button title="Log In" onPress={() => console.log("Logging in...")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
  },
  title: {
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
  },
});

export default LogInScreen;
