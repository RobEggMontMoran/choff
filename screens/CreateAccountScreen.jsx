import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import global from "../styles/globalStyles";
import { registerUser } from "../src/firebase/auth";

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // loading state

  const passwordsDoNotMatch = password !== "" && confirmPassword !== "" && password !== confirmPassword;

  // Sign-up function
  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    if (passwordsDoNotMatch) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    if (password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters.");
    }

    try {
      setIsSubmitting(true);
      await registerUser(email, password);
      Alert.alert("Success", "Account created!");
      // onAuthStateChanged listener in StackNavigator handles routing
    } catch (err) {
      Alert.alert("Signup Failed", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <Button
          title={isSubmitting ? "Creating..." : "Create Account"}
          onPress={handleSignUp}
          color="peru"
          disabled={isSubmitting} // prevent double taps from occuring
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text style={{ color: "saddlebrown", textAlign: "center", marginBottom: 50 }}>Back to Log-in Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const local = StyleSheet.create({
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default CreateAccountScreen;
