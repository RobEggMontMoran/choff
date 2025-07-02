import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import global from "../styles/globalStyles";

const CreateAccountScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsDoNotMatch = password !== "" && confirmPassword !== "" && password !== confirmPassword;

  return (
    <View style={global.screenCentered}>
      <View style={global.alignCenter}>
        <Text style={global.headingL}>Create Account</Text>
        <Text style={global.subheadingL}>Start your brew journey</Text>
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
          placeholder="Create password"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        {password.length > 0 && password.length < 6 ? (
          <Text style={global.errorText}>Password must be longer than 5 characters</Text>
        ) : null}
      </View>

      {/* Password Confirmation */}
      <View style={global.inputWrapper}>
        <Text style={global.textLabelL}>Confirm Password</Text>
        <TextInput
          style={global.inputField}
          placeholder="Confirm password"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {passwordsDoNotMatch && <Text style={global.errorText}>Passwords do not match</Text>}
      </View>

      {/* Submit Button */}
      <View style={local.buttonSpacing}>
        <Button title="Create Account" onPress={() => console.log("Creating account...")} color="peru" />
      </View>
    </View>
  );
};

const local = StyleSheet.create({
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 80,
  },
});

export default CreateAccountScreen;
