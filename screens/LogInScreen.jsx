import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import gs from "../styles/globalStyles";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={gs.mainContainer}>
      <View style={gs.centeredContainer}>
        <View style={gs.headingContainer}>
          <Text style={gs.bigHeadingText}>CHOFF</Text>
          <Text style={gs.subHeadingText}>Your Daily Brew Companion</Text>
        </View>
        <View style={gs.inputContainer}>
          <Text style={gs.titleText}>Email Address</Text>
          <TextInput
            style={gs.inputBox}
            placeholder="Enter email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={gs.inputContainer}>
          <Text style={gs.titleText}>Password</Text>
          <TextInput
            style={gs.inputBox}
            placeholder="Enter password"
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {password.length > 0 && password.length < 6 ? (
            <Text style={gs.warningText}>Password must be longer than 5 characters</Text>
          ) : null}
        </View>
        <View style={gs.buttonContainer}>
          <Button title="Log In" onPress={() => console.log("Logging in...")} color="peru" />
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;
