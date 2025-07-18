import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import global from "../styles/globalStyles";

const LogInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={global.screenCentered}>
      <View style={global.alignCenter}>
        <Text style={global.headingXL}>CHOFF</Text>
        <Text style={global.subheadingL}>Your Daily Brew Companion</Text>
      </View>

      <View style={global.spacerXL} />

      {/* Email Input */}
      <View style={global.inputWrapper}>
        <Text style={global.textLabelL}>Email Address</Text>
        <TextInput
          style={global.inputField}
          placeholder="Enter email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={global.inputWrapper}>
        <Text style={global.textLabelL}>Password</Text>
        <TextInput
          style={global.inputField}
          placeholder="Enter password"
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Submit Button */}
      <View style={local.buttonMargin}>
        <Button title="Log In" onPress={() => console.log("Logging in...")} color="peru" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={{ color: "saddlebrown", textAlign: "center", marginBottom: 50 }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  buttonMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LogInScreen;
